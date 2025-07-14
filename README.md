# Kontinental Audit - Application de Gestion

Application web complète pour la gestion des missions d'audit et de conseil.

## Fonctionnalités Principales

- Interface administrateur complète
- Gestion des missions et catégories
- Galerie de références
- Présentation de l'équipe
- Système de contact
- Thème clair/sombre
- Internationalisation (français/anglais)

## Technologies Utilisées

- **Framework**: React avec TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Base de données**: Supabase
- **Hébergement**: Netlify

## Captures d'Écran

![Page d'accueil](public/readme/Capture%20d%E2%80%99%C3%A9cran%20du%202025-07-14%2016-37-29.png)
![Interface Admin](public/readme/Capture%20d%E2%80%99%C3%A9cran%20du%202025-07-14%2016-37-36.png)
![Gestion des Missions](public/readme/Capture%20d%E2%80%99%C3%A9cran%20du%202025-07-14%2016-38-02.png)

## Installation Locale

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-repo/kontinental-audit-react.git
cd kontinental-audit-react
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
Créer un fichier `.env` basé sur `.env.example` et remplir les valeurs nécessaires.

4. Démarrer l'application :
```bash
npm run dev
```

## Déploiement

Le projet est configuré pour un déploiement facile sur Netlify :

1. Connecter votre compte Netlify au dépôt GitHub
2. Les paramètres de build sont préconfigurés dans `netlify.toml`
3. Les variables d'environnement doivent être configurées dans les paramètres Netlify

## Structure du Projet

```
src/
├── components/       # Composants réutilisables
├── pages/            # Pages de l'application  
├── context/          # Contextes React
├── hooks/            # Hooks personnalisés
├── lib/              # Utilitaires et clients
├── types/            # Définitions TypeScript
├── locales/          # Fichiers de traduction
public/               # Assets statiques
```

## Contribution

Les contributions sont les bienvenues. Merci de créer une issue pour discuter des changements proposés avant de soumettre une pull request.
