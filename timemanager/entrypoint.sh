#!/bin/sh

# Attendre que PostgreSQL soit prêt
# ./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "PostgreSQL is up"

# Exécuter les migrations si en mode production ou lors d'un développement
if [ "$MIX_ENV" = "prod" ]; then
  echo "Running in production mode..."
  mix ecto.migrate
else
  echo "Running in development mode..."
  mix ecto.drop
  mix ecto.create
  mix ecto.migrate
fi

# Démarrer le serveur Phoenix
exec mix phx.server
