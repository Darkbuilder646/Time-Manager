import Config

# Configure your database
#
# The MIX_TEST environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :timemanager, Timemanager.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "timemanager_#{System.get_env("MIX_TEST")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

# Configure the database for GitHub Actions
if System.get_env("GITHUB_ACTIONS") do
  config :app, App.Repo,
    username: "postgres",
    password: "postgres"
end

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :timemanager, TimemanagerWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "GA6XPen7xunfEWRMwlTnJqFvsuX1cu3ynhOlL8SbwmjQPJB1oQvngfjxWnFRNF/y",
  server: false

# In test we don't send emails
config :timemanager, Timemanager.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
