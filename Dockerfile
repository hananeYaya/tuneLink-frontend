FROM node:18-bullseye

# Définition des arguments et variables d'environnement
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ENV NPM_VERSION=10.2.3

# Installation des dépendances système nécessaires
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    unzip \
    python3 \
    openssh-client \
    gnupg \
    procps \
    ca-certificates \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Installation de npm v10
RUN npm install -g npm@${NPM_VERSION}

# Installation des outils globaux pour React Native
# Yarn est déjà installé dans l'image node:18-bullseye
# Installation des outils nécessaires pour React Native Expo
# Utilisation de la nouvelle approche recommandée
RUN npm install -g expo eas-cli

# Créer le répertoire de travail et définir les permissions
WORKDIR /app
RUN mkdir -p /app/node_modules && chown -R $USERNAME:$USERNAME /app

# Définir l'utilisateur par défaut 
USER $USERNAME

# Exposition des ports utilisés par Expo
EXPOSE 19000 19001 19002 8081

# Définir la commande par défaut
CMD ["bash"]