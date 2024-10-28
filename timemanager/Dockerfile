FROM elixir:1.16.1-alpine

# test installation dépendance pour bcrypt
# RUN apk add --no-cache build-base
# RUN apk update && apk add postgresql-client

# RUN mkdir /timemanager
# COPY . /timemanager/
# COPY entrypoint.sh /timemanager/
# COPY seed_data.sql /timemanager/

# WORKDIR /timemanager

# RUN mix local.hex --force
# # RUN mix deps.clean --all
# RUN mix deps.get
# RUN mix local.rebar --force

# EXPOSE 4001

# RUN chmod +x /timemanager/entrypoint.sh

# ENTRYPOINT ["/timemanager/entrypoint.sh"]

# Installer les dépendances nécessaires
RUN apk update && apk add --no-cache build-base postgresql-client

# Créer un répertoire de travail
WORKDIR /timemanager

# Copier uniquement les fichiers nécessaires pour la compilation des dépendances
COPY mix.exs mix.lock ./

# Installer les dépendances et nettoyer le cache
RUN mix local.hex --force && \
    mix deps.get && \
    mix local.rebar --force && \
    mix deps.compile

# Copier le reste de l'application
COPY . .

# Donner les permissions au script d'entrée
RUN chmod +x entrypoint.sh

# Exposer le port
EXPOSE 4001

# Définir le point d'entrée
ENTRYPOINT ["./entrypoint.sh"]
