# EidosFlow — code source du site

Ce dossier contient le code source lisible et modifiable du site.
Après chaque modification, lancer `node build.mjs` depuis la racine du dépôt : le script génère
le site publié (une vraie page HTML par adresse, `sitemap.xml`, copie des fichiers).

## Contenu

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Page principale : structure HTML, styles, textes FR/EN (objet `T`) et logique (classe `Component`) |
| `seo.js` | Titre de l'onglet et description Google de chaque page, en FR et en EN ; adresse publique du site |
| `config.js` | Réglages : liens réseaux sociaux |
| `js/runtime.js` | Moteur qui affiche la page (gabarits `{{ … }}`, `<sc-if>`, `<sc-for>`) |
| `js/vendor/` | React 18.3.1 (copie locale) |
| `assets/fonts/` | Polices Montserrat, Quicksand, JetBrains Mono |
| `assets/img/` | Photos de l'équipe (400 × 400 px, carrées) |
| `assets/clients/` | Logos des références clients (WebP sans perte) |

## Adresses des pages

Chaque page a sa vraie adresse, par exemple `/fr/savoir-faire/cybersecurite/` ou `/en/about/`.
Les slugs sont définis dans `index.html` (`static SLUGS` et `static DSLUG`) ; `build.mjs` les lit
pour générer les pages. Les anciens liens en `#/fr/…` restent valables : ils sont redirigés.

## Lancer le site en local

Générer le site puis servir la racine du dépôt sous `/Eidosflow/` (comme GitHub Pages), par exemple :

```bash
node build.mjs
npx serve .. -l 8000
```

puis ouvrir http://localhost:8000/Eidosflow/ (le dossier parent doit s'appeler `Eidosflow`).

## Modifier les textes

Tous les textes sont dans `index.html`, dans l'objet `static T = { fr: {…}, en: {…} }`.
Modifier la version française et la version anglaise de chaque texte.
Les titres et descriptions affichés par Google et LinkedIn sont dans `seo.js`.

## Passer au domaine eidosflow.com

Dans `seo.js`, remplacer `origin` par `'https://eidosflow.com'` et `base` par `'/'`,
relancer `node build.mjs`, puis configurer le domaine dans les réglages GitHub Pages du dépôt.
