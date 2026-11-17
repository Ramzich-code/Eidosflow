# EidosFlow

Site web d'EidosFlow, publié avec GitHub Pages : https://ramzich-code.github.io/Eidosflow/

- `source/` — **le seul endroit à modifier** : code source lisible (voir `source/LISEZMOI.md`)
- `build.mjs` — génère le site publié à partir de `source/` : `node build.mjs`
- tout le reste à la racine (`index.html`, `fr/`, `en/`, `assets/`, `js/`, `sitemap.xml`…) est **généré** par `build.mjs` : ne pas le modifier à la main, il serait écrasé.

## Publier une modification

```bash
node build.mjs
git add -A
git commit -m "Description de la modification"
git push
```

GitHub Pages met le site à jour en une à deux minutes.
