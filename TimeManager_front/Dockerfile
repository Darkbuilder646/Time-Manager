# Étape 1: Utiliser une image Node.js officielle pour builder l'application
FROM node:18-alpine AS build-stage

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet dans le container
COPY . .

# Builder l'application pour la production
RUN npm run build

# Étape 2: Utiliser une image Nginx pour servir l'application
FROM nginx:stable-alpine AS production-stage

# Copier les fichiers build depuis le build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port 80 pour que l'application soit accessible
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]