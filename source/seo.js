/*
 * EidosFlow — référencement (SEO) et aperçus de partage, page par page.
 * Utilisé par le site (titre de l'onglet, description…) ET par build.mjs,
 * qui génère une vraie page HTML par adresse avec ces informations.
 *
 * site.origin + site.base = adresse publique du site.
 *   Le jour où le domaine eidosflow.com est branché :
 *   origin: 'https://eidosflow.com', base: '/'  puis relancer  node build.mjs
 *
 * noindex: true  -> page exclue de Google et du sitemap (ex. pages « À venir »).
 */
window.EIDOSFLOW_SEO = {
  site: {
    origin: 'https://ramzich-code.github.io',
    base: '/Eidosflow/',
    name: 'EidosFlow',
    image: 'og-image.jpg',
    imageAlt: {
      fr: 'EidosFlow — Conseil technologique & expertise technique : cybersécurité, data, IA',
      en: 'EidosFlow — Technology advisory & technical expertise: cybersecurity, data, AI'
    },
    linkedin: 'https://www.linkedin.com/company/eidosflow/',
    email: 'contact@eidosflow.com'
  },
  pages: {
    fr: {
      home: {
        title: 'EidosFlow — Conseil en cybersécurité, data et IA',
        description: 'EidosFlow, cabinet indépendant de conseil technologique : cybersécurité, data et IA. Vision stratégique, profondeur technique, regard humain.'
      },
      capabilities: {
        title: 'Savoir-faire — Cybersécurité, data et IA | EidosFlow',
        description: 'Nos expertises en cybersécurité, data et intelligence artificielle, et les services qui en découlent.'
      },
      cyber: {
        title: 'Cybersécurité — Tests d’intrusion, audit et supervision | EidosFlow',
        description: 'Tests d’intrusion interne et Active Directory, sécurité des applications, diagnostic cyber PME et supervision de sécurité. Des failles démontrées, expliquées sans jargon.'
      },
      data: { title: 'Data | EidosFlow', description: 'Nos expertises et services data seront bientôt présentés ici.', noindex: true },
      ai: { title: 'IA | EidosFlow', description: 'Nos expertises et services en intelligence artificielle seront bientôt présentés ici.', noindex: true },
      blog: {
        title: 'Blog — Analyses et retours d’expérience | EidosFlow',
        description: 'Analyses et retours d’expérience de l’équipe EidosFlow sur la data, l’IA et la cybersécurité.'
      },
      'post:genai-roi': {
        title: 'Turning GenAI into Business Impact: The ROI Approach | EidosFlow',
        description: 'Mesurer le retour sur investissement d’un projet d’IA générative dès le premier jour : critères de succès métier, lien entre indicateurs techniques et métier, restitution adaptée à chaque public.',
        type: 'article'
      },
      about: {
        title: 'À propos — L’équipe EidosFlow',
        description: 'Les co-fondateurs d’EidosFlow : data science et IA, stratégie data et IA, cybersécurité et gouvernance.'
      },
      legal: { title: 'Mentions légales | EidosFlow', description: 'Mentions légales du site EidosFlow.' },
      privacy: { title: 'Politique de confidentialité | EidosFlow', description: 'Comment EidosFlow traite vos données personnelles.' }
    },
    en: {
      home: {
        title: 'EidosFlow — Cybersecurity, data and AI consulting',
        description: 'EidosFlow is an independent technology advisory firm: cybersecurity, data and AI. Strategic thinking, technical depth, human perspective.'
      },
      capabilities: {
        title: 'Capabilities — Cybersecurity, data and AI | EidosFlow',
        description: 'Our expertise in cybersecurity, data and artificial intelligence, and the services built on it.'
      },
      cyber: {
        title: 'Cybersecurity — Penetration testing, audits and monitoring | EidosFlow',
        description: 'Internal and Active Directory penetration testing, application security, SME cyber assessments and security monitoring. Every flaw demonstrated and explained in plain terms.'
      },
      data: { title: 'Data | EidosFlow', description: 'Our data expertise and services will be presented here soon.', noindex: true },
      ai: { title: 'AI | EidosFlow', description: 'Our AI expertise and services will be presented here soon.', noindex: true },
      blog: {
        title: 'Blog — Insights and field notes | EidosFlow',
        description: 'Insights and field notes from the EidosFlow team on data, AI and cybersecurity.'
      },
      'post:genai-roi': {
        title: 'Turning GenAI into Business Impact: The ROI Approach | EidosFlow',
        description: 'Measuring the ROI of a generative AI project from day one: business success criteria, linking technical and business metrics, and reporting tailored to each audience.',
        type: 'article'
      },
      about: {
        title: 'About — The EidosFlow team',
        description: 'Meet the EidosFlow co-founders: data science and AI, data and AI strategy, cybersecurity and governance.'
      },
      legal: { title: 'Legal notice | EidosFlow', description: 'Legal notice for the EidosFlow website.' },
      privacy: { title: 'Privacy policy | EidosFlow', description: 'How EidosFlow processes your personal data.' }
    }
  }
};
