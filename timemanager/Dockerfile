# Étape 1: Construction de l'application
FROM elixir:1.17.3-alpine AS build

RUN mix local.hex --force

WORKDIR /app

COPY mix.exs mix.lock ./

RUN mix deps.get

COPY . .

RUN mix compile

# Étape 2: Exécution de l'application
FROM elixir:1.17.3-alpine AS runtime

WORKDIR /app

COPY --from=build /app/_build .
COPY --from=build /app/mix.exs ./
COPY --from=build /app/config ./config
COPY --from=build /app/lib ./lib
COPY --from=build /app/priv ./priv

EXPOSE 4000

# Lancer l'application Elixir
CMD ["mix", "phx.server"]