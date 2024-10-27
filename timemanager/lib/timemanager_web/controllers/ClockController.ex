defmodule TimemanagerWeb.ClockController do
  use TimemanagerWeb, :controller

  alias Timemanager.Timers
  alias Timemanager.Timers.Clock

  action_fallback(TimemanagerWeb.FallbackController)

  # GET /api/clocks/:userID
  def index(conn, %{"user_id" => user_id}) do
    case Timers.get_clocks_by_user(user_id) do
      [] ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Aucune horloge trouvée pour cet utilisateur"})

      clocks ->
        json(conn, clocks)
    end
  end

  # POST /api/clocks/:userID
  def create(conn, %{"user_id" => user_id}) do
    status = Timers.working_state(user_id)
    clock_params = %{"user_id" => user_id, "status" => status, "time" => DateTime.utc_now()}

    case Timers.create_clock(clock_params) do
      {:ok, clock} ->
        conn
        |> put_status(:created)
        |> json(clock)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(:show, changeset: changeset)
      end
  end
end
