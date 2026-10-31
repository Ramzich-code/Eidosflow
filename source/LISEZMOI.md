# EidosFlow — code source du site

Ce dossier contient le code source lisible et modifiable du site, avec ses fichiers séparés.
Le fichier `index.html` à la racine du dépôt est la version « tout-en-un » publiée sur GitHub Pages.

## Contenu

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Page principale : structure HTML, styles, textes FR/EN (objet `T`) et logique (classe `Component`) |
| `config.js` | Configuration modifiable sans rien reconstruire (liens réseaux sociaux…) |
| `js/runtime.js` | Moteur qui affiche la page (gabarits `{{ … }}`, `<sc-if>`, `<sc-for>`) |
| `js/vendor/` | React 18.3.1 (copie locale, fonctionne hors ligne) |
| `assets/fonts/` | Polices Montserrat, Quicksand, JetBrains Mono |
| `assets/img/` | Photos de l'équipe |
| `assets/clients/` | Logos des références clients |

## Lancer le site en local

Les navigateurs bloquent certains chargements quand on ouvre le fichier par double-clic.
Il faut donc lancer un petit serveur depuis ce dossier :

```bash
cd source
python3 -m http.server 8000
```

Ouvrir ensuite http://localhost:8000 dans le navigateur.

## Modifier les textes

Tous les textes sont dans `index.html`, dans l'objet `static T = { fr: {…}, en: {…} }`.
Modifier la version française et la version anglaise de chaque texte.
