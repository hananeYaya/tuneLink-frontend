# TuneLink - Application Mobile d'Événements Musicaux

## Spécifications Techniques

### Versions

- Node.js: v18.x ou supérieur
- React Native: 0.72.x
- Expo: 49.x
- TypeScript: 5.x
- Docker: 24.x ou supérieur
- Docker Compose: v2.x

### Dépendances Principales

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Router
- React Native Paper (UI Components)

## Guide de Déploiement

### 1. Déploiement avec DevContainer (Recommandé pour le développement)

#### Pour les Utilisateurs

1. Prérequis :

   - [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension

2. Étapes de déploiement :

   ```bash
   # Cloner le repository
   git clone https://github.com/hananeYaya/tuneLink-frontend.git
   cd tuneLink-frontend

   # Ouvrir VS Code dans le dossier
   code .
   ```

   - Appuyer sur F1 et sélectionner "Remote-Containers: Reopen in Container"
   - Attendre que le container se construise et se démarre

3. Accès à l'application :
   - L'application sera disponible sur http://localhost:19006
   - Pour accéder à l'application mobile, scanner le QR code avec l'application Expo Go

#### Pour les Développeurs

1. Configuration du DevContainer :

   - Le fichier `.devcontainer/devcontainer.json` contient toute la configuration
   - Les extensions VS Code recommandées sont automatiquement installées
   - L'environnement de développement est préconfiguré avec tous les outils nécessaires

2. Commandes utiles :

   ```bash
   # Installer les dépendances
   npm install

   # Démarrer l'application en mode développement
   npm run web

   # Lancer les tests
   npm test

   # Vérifier le linting
   npm run lint
   ```

### 2. Déploiement avec Docker (Sans DevContainer)

#### Pour les Utilisateurs

1. Prérequis :

   - [Docker](https://www.docker.com/products/docker-desktop/)
   - [Docker Compose](https://docs.docker.com/compose/install/)

2. Étapes de déploiement :

   ```bash
   # Cloner le repository
   git clone https://github.com/hananeYaya/tuneLink-frontend.git
   cd tuneLink-frontend

   # Construire et démarrer les containers
   docker-compose up --build -d
   ```

3. Accès à l'application :
   - L'application sera disponible sur http://localhost:19006
   - Pour accéder à l'application mobile, scanner le QR code avec l'application Expo Go

#### Pour les Développeurs

1. Commandes Docker utiles :

   ```bash
   # Accéder au container
   docker exec -it my-app-react-native-app-1 bash

   # Voir les logs
   docker-compose logs -f

   # Arrêter les containers
   docker-compose down
   ```

### 3. Déploiement Local (Sans Docker)

#### Pour les Utilisateurs

1. Prérequis :

   - [Node.js](https://nodejs.org/) (v18.x ou supérieur)
   - [npm](https://www.npmjs.com/) (v9.x ou supérieur)
   - [Expo CLI](https://docs.expo.dev/get-started/installation/)
   - [Expo Go](https://docs.expo.dev/get-started/installation/#install-expo-go) (pour mobile)

2. Étapes de déploiement :

   ```bash
   # Cloner le repository
   git clone https://github.com/hananeYaya/tuneLink-frontend.git
   cd tuneLink-frontend

   # Installer les dépendances
   npm install

   # Démarrer l'application
   npm run web
   ```

3. Accès à l'application :
   - L'application sera disponible sur http://localhost:19006
   - Pour accéder à l'application mobile, scanner le QR code avec l'application Expo Go

#### Pour les Développeurs

1. Configuration de l'environnement :

   ```bash
   # Installer les dépendances de développement
   npm install

   # Configurer les variables d'environnement
   cp .env.example .env
   # Éditer .env avec vos configurations
   ```

2. Commandes de développement :

   ```bash
   # Démarrer en mode développement
   npm run web

   # Lancer les tests
   npm test

   # Vérifier le linting
   npm run lint

   # Construire pour la production
   npm run build
   ```

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

```bash
   git clone https://github.com/hananeYaya/tuneLink-frontend.git

   npm install

   expo start
```
