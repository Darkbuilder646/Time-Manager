FROM elixir:1.16.1-alpine

# Build Args
ARG PHOENIX_VERSION=1.7.14

# Phoenix
RUN mix local.hex --force
RUN mix archive.install --force hex phx_new ${PHOENIX_VERSION}
RUN mix local.rebar --force

# Step 1: Copy mix files and install dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get
RUN mix compile

# Step 2: Copy the rest of the application
COPY . .

# Set environment variables
# ENV MIX_ENV=prod
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Expose port
EXPOSE 4001

# Default command (with a script to conditionally handle ecto tasks)
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["mix", "phx.server"]
