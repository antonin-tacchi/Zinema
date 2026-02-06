# Zinema (React + Vite + Tailwind)

Migration de ton Zinema HTML/JS vers **React**.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Routes
- `/` accueil + hero + carousels
- `/movies` films populaires (pagination)
- `/series` séries populaires (pagination)
- `/favorites` favoris (localStorage)
- `/details?id=...&type=movie|tv` fiche + avis + recommandations

## Favoris
Stocké en localStorage dans la clé `favorites`.

## Avis
Les avis que tu ajoutes sont stockés en localStorage (clé `user_reviews_<type>_<id>`).

## Notes
- Si tu veux absolument Tailwind `3.4.14` : c’est déjà la version dans `package.json`.
- Si tu veux rendre la clé TMDB obligatoire et supprimer le fallback, dis-moi et je te le fais.
