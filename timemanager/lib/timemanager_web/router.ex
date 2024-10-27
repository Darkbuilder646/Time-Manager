defmodule TimemanagerWeb.Router do
  use TimemanagerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TimemanagerWeb do
    pipe_through :api

    resources "/users", UserController, only: [:index, :show, :create, :update, :delete]
    post("/login", UserController, :login)
    post("/check_token", UserController, :check_token)

    get("/users/:user_id/teams", TeamController, :teams)
    get "/teams", TeamController, :all_teams
    get("/users/teams", TeamController, :all_teams)

    get("/workingtime/:user_id", WorkingTimeController, :index)
    get("/workingtime/:user_id/:id", WorkingTimeController, :show)
    post("/workingtime/:user_id", WorkingTimeController, :create)
    resources "/workingtime", WorkingTimeController, only: [:update, :delete]

    get "/clocks/:user_id", ClockController, :index
    post "/clocks/:user_id", ClockController, :create
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:timemanager, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: TimemanagerWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
