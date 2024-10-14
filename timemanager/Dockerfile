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

ENV DATABASE_URL ecto://admin:yKIZKqeHtlLtZaiaBCxYrfvROCPGQcQd@dpg-cs6h2u56l47c73fem020-a/timemanager_prod
ENV SECRET_KEY_BASE 0/oj87VZ7VIAnk+kxVPUgP4l476zmbkUiqrG3TIAaZRVdXpMiAI8ZJMbtYXrZW+5

RUN mix ecto.create
RUN mix ecto.migrate

# App Port
EXPOSE 4001

# Default Command
CMD ["sh", "-c", "mix ecto.migrate && iex -S mix phx.server"]