FROM elixir:1.16.1-alpine

# Installer les dépendances de construction
RUN apk add --no-cache build-base postgresql-client

# Définir et préparer le répertoire de travail
WORKDIR /timemanager

# Copier uniquement les fichiers nécessaires pour récupérer les dépendances
COPY mix.exs mix.lock ./

# Installation des dépendances Elixir
RUN mix local.hex --force && mix local.rebar --force
RUN mix deps.get

# Compiler les dépendances pour éviter la recompilation à chaque modification du code
RUN mix deps.compile

# Copier le reste du code de l'application
COPY . .

# Compilation de l’application
RUN mix compile

# Rendre le fichier entrypoint exécutable
RUN chmod +x /timemanager/entrypoint.sh

# Exposer le port d’écoute
EXPOSE 4001

# Définir le point d'entrée
ENTRYPOINT ["/timemanager/entrypoint.sh"]
