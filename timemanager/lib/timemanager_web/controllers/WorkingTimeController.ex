defmodule TimemanagerWeb.WorkingTimeController do
  use TimemanagerWeb, :controller

  alias ElixirSense.Log
  alias Timemanager.Timers
  alias Timemanager.Timers.WorkingTime

  action_fallback(TimemanagerWeb.FallbackController)

  # GET /api/workingtime
  # def index(conn) do
  #  workingTimes = Timers.list_workingtimes(params)
  #  json(conn, %{data: workingTimes})
  # end

  # GET /api/workingtime?start=XXX&end=YYY
  def index(conn, params) do
    workingTimes = Timers.list_workingtimes(params)
    json(conn, workingTimes)
  end

    # GET /api/workingtime/:userID/:id
    def show(conn, %{"id" => id, "user_id" => user_id}) do
      case Timers.get_working_time!(user_id, id) do
        nil ->
          conn
          |> put_status(:not_found)
          |> json(%{error: "Temps de travail non trouvé"})

        working_time ->
          json(conn, working_time)
      end
    end

    # POST /api/workingtime/:userID
    def create(conn, %{"user_id" => user_id, "workingtime" => workingtime_params}) do
      workingtime_params = Map.put(workingtime_params, "user_id", user_id)
      case Timers.create_working_time(workingtime_params) do
        {:ok, workingtime} ->
          conn
          |> put_status(:created)
          |> json(workingtime)

        {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render(:show, changeset: changeset)
      end
    end

    # PUT /api/workingtime/:id
    def update(conn, %{"id" => id, "workingtime" => working_time_params}) do
      case Timers.get_working_time_by_id!(id) do
        nil ->
          conn
          |> put_status(:not_found)
          |> json(%{error: "Temps de travail non trouvé"})

        working_time ->
          case Timers.update_working_time(working_time, working_time_params) do
            {:ok, %WorkingTime{} = updated_working_time} ->
              json(conn, updated_working_time)

            {:error, changeset} ->
              conn
              |> put_status(:unprocessable_entity)
              |> render(:show, changeset: changeset)
            end
      end
  end

  # DELETE /api/workingtime/:id
  def delete(conn, %{"id" => id}) do
    case Timers.get_working_time_by_id!(id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Temps de travail non trouvé"})

      working_time ->
        case Timers.delete_working_time(working_time) do
          {:ok, %WorkingTime{}} ->
            send_resp(conn, :no_content, "")

          {:error, _reason} ->
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{error: "Impossible de supprimer le temps de travail"})
        end
    end
  end
end
