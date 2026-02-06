# 🎬 Zynema

---

## 💡 Présentation du projet

> **Zynema** est une application web développée en **React** qui vous permet de créer une bibliothèque de films et séries personnalisée grâce à l'API publique **The Movie Database (TMDB)**.

Cette application permet de :

✅ Explorer des films et séries via TMDB.  
✅ Organiser et sauvegarder vos favoris dans le **LocalStorage**.  
✅ Lire et écrire des commentaires.  
✅ Utiliser une **barre de recherche avec autocomplétion** en JavaScript asynchrone.  
✅ Regarder les **bandes-annonces directement dans l’application** via un modal intégré.  
✅ Naviguer sur une interface **responsive** optimisée pour desktop et mobile.

### 🎯 Fonctionnalités principales

- 🏠 **Page d'accueil** : Sélections dynamiques de films et séries sous forme de carrousels.
- 🎞️ **Pages catalogue** : Liste complète de films et séries.
- 🔍 **Page de détails** :
  - Informations complètes
  - Suggestions de contenus similaires
  - Bande-annonce intégrée
  - Plateformes de streaming disponibles
- ⭐ **Système de favoris** : Gestion locale avec LocalStorage.
- 💬 **Commentaires** : Affichage et ajout de retours utilisateur.

---

## 💻 Technologies utilisées

| Technologie | Rôle |
| --- | --- |
| React | Interface utilisateur |
| Vite | Outil de build & environnement de dev |
| Tailwind CSS | Mise en forme & design responsive |
| JavaScript (ES6+) | Logique applicative |
| API TMDB (REST) | Récupération des données films & séries |
| LocalStorage | Stockage local des favoris & commentaires |
| Responsive Web Design | Adaptation aux écrans desktop et mobiles |

---

## ⚙️ Instructions d'installation

1. **Cloner le dépôt :**

```bash
git clone https://github.com/votre-utilisateur/zynema.git
```

2. **Accéder au dossier du projet :**

```bash
cd zynema
```

3. **Installer les dépendances :**

```bash
npm install
```

4. **Obtenir une clé API TMDB :**

➡️ https://www.themoviedb.org/settings/api

5. **Configurer la clé API :**

Créer un fichier `.env` à la racine du projet :

```env
VITE_TMDB_API_KEY=VOTRE_CLE_API
VITE_TMDB_LANGUAGE=fr-FR
```

6. **Lancer le projet en mode développement :**

```bash
npm run dev
```

L’application sera accessible sur `http://localhost:5173`.

---

## 🔗 Liens utiles

- 🌐 https://www.themoviedb.org/
- 📚 https://developer.themoviedb.org/docs
- 💡 https://developer.themoviedb.org/docs/getting-started

---

✨ **Bon développement et bon visionnage !** 🎥🍿