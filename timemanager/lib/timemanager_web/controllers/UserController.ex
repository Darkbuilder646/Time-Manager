defmodule TimemanagerWeb.UserController do
  use TimemanagerWeb, :controller

  alias Timemanager.Accounts
  alias Timemanager.Accounts.User

  action_fallback(TimemanagerWeb.FallbackController)

  # GET /api/users
  # def index(conn) do
  #   users = Accounts.list_users()
  #   json(conn, %{data: users})
  # end

  # GET /api/users?email=XXX&username=YYY
  def index(conn, params) do
    users = Accounts.list_users(params)
    json(conn, %{data: users})
  end

  # GET /api/users/:userID
  def show(conn, %{"id" => id}) do
    case Accounts.get_user!(id) do
      nil -> send_resp(conn, :not_found, "")
      user -> json(conn, %{data: user})
    end
  end

  # POST /api/users
  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        # |> put_resp_header("location", Routes.user_path(conn, :show, user))
        |> json(%{data: user})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset})
    end
  end

  # PUT /api/users/:userID
  def update(conn, %{"id" => id, "user" => user_params}) do
    case Accounts.get_user!(id) do
      nil ->
        send_resp(conn, :not_found, "")

      user ->
        case Accounts.update_user(user, user_params) do
          {:ok, user} ->
            json(conn, %{data: user})

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: changeset})
        end
    end
  end

  # DELETE /api/users/:userID
  def delete(conn, %{"id" => id}) do
    case Accounts.get_user!(id) do
      nil ->
        send_resp(conn, :not_found, "")

      user ->
        case Accounts.delete_user(user) do
          {:ok, user} ->
            conn
            |> put_status(:ok)
            |> json(%{message: "User deleted successfully."})

          # send_resp(conn, :no_content, "")
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: "Unable to delete user."})

            # send_resp(conn, :unprocessable_entity, "")
        end
    end
  end
end
