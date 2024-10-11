FROM elixir:1.16.1-alpine

# Build Args
ARG PHOENIX_VERSION=1.7.14

# Phoenix
RUN mix local.hex --force
RUN mix archive.install --force hex phx_new ${PHOENIX_VERSION}
RUN mix local.rebar --force

COPY mix.exs mix.lock ./

RUN mix deps.get && mix compile

# App Directory
ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

# App Port
EXPOSE 4000

# Default Command
CMD ["iex", "-S", "mix", "phx.server"]