#!/usr/bin/env node
/*
 * EidosFlow — génération du site publié à partir du dossier source/.
 *
 *   node build.mjs
 *
 * On modifie UNIQUEMENT les fichiers de source/ (textes dans source/index.html, réglages
 * dans source/config.js, titres et descriptions Google dans source/seo.js), puis on lance
 * cette commande. Elle régénère à la racine du dépôt, publiée par GitHub Pages :
 *   - une vraie page HTML par adresse (/fr/, /fr/savoir-faire/cybersecurite/, /en/about/…),
 *     chacune avec son titre, sa description, son URL canonique, ses versions FR/EN (hreflang)
 *     et son aperçu de partage (LinkedIn, WhatsApp…) ;
 *   - index.html (accueil), 404.html, sitemap.xml et robots.txt ;
 *   - une copie de assets/, js/, config.js et seo.js.
 * Rien d’autre n’est nécessaire (pas de npm install) : Node.js suffit.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'source');

// --- Lecture de seo.js et des adresses déclarées dans source/index.html -------------------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(SRC, 'seo.js'), 'utf8'), sandbox);
const SEO = sandbox.window.EIDOSFLOW_SEO;
const { origin, base } = SEO.site;
const tpl = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');

const grab = (name) => {
  const m = tpl.match(new RegExp('static ' + name + ' = (\\{[\\s\\S]*?\\});\\n'));
  if (!m) throw new Error('Impossible de lire ' + name + ' dans source/index.html');
  return vm.runInNewContext('(' + m[1] + ')');
};
const SLUGS = grab('SLUGS');
const DSLUG = grab('DSLUG');
const POSTS = [...tpl.matchAll(/^\s+slug: '([^']+)',$/gm)].map((m) => m[1]);
const POST_META = { 'genai-roi': { author: 'Sofiane Medjkoune', date: '2025-08-24' } };

// --- Liste des pages ----------------------------------------------------------------------
const pathFor = (lang, key) => {
  const s = SLUGS[lang], d = DSLUG[lang];
  if (key === 'home') return lang + '/';
  if (key in d) return lang + '/' + s.capabilities + '/' + d[key] + '/';
  if (key.startsWith('post:')) return lang + '/' + s.blog + '/' + key.slice(5) + '/';
  return lang + '/' + s[key] + '/';
};
const KEYS = ['home', 'capabilities', 'cyber', 'data', 'ai', 'blog', ...POSTS.map((p) => 'post:' + p), 'about', 'legal', 'privacy'];
const pages = [];
for (const lang of ['fr', 'en']) for (const key of KEYS) pages.push({ lang, key, rel: pathFor(lang, key) });

// --- Génération du <head> de chaque page --------------------------------------------------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (rel) => origin + base + rel;
const jsonLd = (obj) => '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, '\\u003c') + '</script>';

function head({ lang, key, rel, canonicalRel, noindex }) {
  const m = SEO.pages[lang][key];
  const url = abs(canonicalRel ?? rel);
  const robots = noindex || m.noindex ? 'noindex, follow' : 'index, follow';
  const img = abs(SEO.site.image);
  const out = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<link rel="alternate" hreflang="fr" href="${esc(abs(pathFor('fr', key)))}">`,
    `<link rel="alternate" hreflang="en" href="${esc(abs(pathFor('en', key)))}">`,
    `<link rel="alternate" hreflang="x-default" href="${esc(abs(pathFor('fr', key)))}">`,
    `<meta property="og:type" content="${m.type === 'article' ? 'article' : 'website'}">`,
    `<meta property="og:site_name" content="${esc(SEO.site.name)}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(img)}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(SEO.site.imageAlt[lang])}">`,
    `<meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'en_US'}">`,
    `<meta property="og:locale:alternate" content="${lang === 'fr' ? 'en_US' : 'fr_FR'}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(m.title)}">`,
    `<meta name="twitter:description" content="${esc(m.description)}">`,
    `<meta name="twitter:image" content="${esc(img)}">`
  ];
  const org = {
    '@type': 'Organization', '@id': abs('') + '#organization', name: SEO.site.name, url: abs(''),
    logo: abs('assets/apple-touch-icon.png'), email: SEO.site.email, sameAs: [SEO.site.linkedin],
    description: SEO.pages[lang].home.description
  };
  if (key === 'home') out.push(jsonLd({ '@context': 'https://schema.org', ...org }));
  if (key.startsWith('post:')) {
    const pm = POST_META[key.slice(5)] || {};
    out.push(jsonLd({
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: m.title.replace(/ \| EidosFlow$/, ''),
      description: m.description, inLanguage: 'en', url, image: img, datePublished: pm.date,
      author: pm.author ? { '@type': 'Person', name: pm.author } : undefined,
      publisher: { '@type': 'Organization', name: SEO.site.name, logo: { '@type': 'ImageObject', url: abs('assets/apple-touch-icon.png') } }
    }));
  }
  return out.join('\n');
}

function render(p) {
  let html = tpl;
  const swap = (a, b) => { if (!html.includes(a)) throw new Error('Repère introuvable dans source/index.html : ' + a); html = html.replace(a, () => b); };
  swap('<html lang="fr">', `<html lang="${p.lang}"${p.notFound ? ' data-not-found' : ''}>`);
  swap('<!-- BASE -->', `<base href="${esc(base)}">`);
  html = html.replace(/<!-- SEO:START[\s\S]*?<!-- SEO:END -->/, () => '<!-- Généré par build.mjs à partir de source/seo.js -->\n' + head(p));
  return html;
}

// --- Écriture -----------------------------------------------------------------------------
const write = (rel, content) => {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
for (const lang of ['fr', 'en']) fs.rmSync(path.join(ROOT, lang), { recursive: true, force: true });
for (const p of pages) write(p.rel + 'index.html', render(p));
// Accueil à la racine : version française, la version de référence pour Google est /fr/
write('index.html', render({ lang: 'fr', key: 'home', rel: '', canonicalRel: pathFor('fr', 'home') }));
// Page introuvable : affiche l’accueil, exclue de Google
write('404.html', render({ lang: 'fr', key: 'home', rel: '', canonicalRel: pathFor('fr', 'home'), noindex: true, notFound: true }));

// Fichiers du site (copie fidèle de source/)
for (const item of ['assets', 'js']) {
  fs.rmSync(path.join(ROOT, item), { recursive: true, force: true });
  fs.cpSync(path.join(SRC, item), path.join(ROOT, item), { recursive: true });
}
for (const f of ['config.js', 'seo.js', 'og-image.jpg']) fs.copyFileSync(path.join(SRC, f), path.join(ROOT, f));

// sitemap.xml (pages indexables uniquement, avec leurs versions FR/EN) et robots.txt
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !SEO.pages[p.lang][p.key].noindex);
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...indexable.map((p) => [
    '  <url>',
    `    <loc>${esc(abs(p.rel))}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <xhtml:link rel="alternate" hreflang="fr" href="${esc(abs(pathFor('fr', p.key)))}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${esc(abs(pathFor('en', p.key)))}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(pathFor('fr', p.key)))}"/>`,
    '  </url>'].join('\n')),
  '</urlset>', ''].join('\n');
write('sitemap.xml', sitemap);
// robots.txt n’est lu par Google qu’à la racine du domaine : il ne sert qu’une fois le domaine eidosflow.com branché.
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`);

console.log(`Site généré : ${pages.length} pages + accueil + 404, ${indexable.length} adresses dans sitemap.xml (${abs('')})`);
