FROM elixir:1.16.1-alpine

# Build Args
ARG PHOENIX_VERSION=1.7.14

# Phoenix
RUN mix local.hex --force
RUN mix archive.install --force hex phx_new ${PHOENIX_VERSION}
RUN mix local.rebar --force

ENV MIX_ENV=prod
ENV APP_HOME=/app
WORKDIR $APP_HOME

COPY . .

RUN mix deps.get --only prod
RUN mix compile


RUN mix ecto.create
RUN mix ecto.migrate

# App Port
EXPOSE 4001

# Default Command
CMD ["sh", "-c", "mix ecto.migrate && iex -S mix phx.server"]