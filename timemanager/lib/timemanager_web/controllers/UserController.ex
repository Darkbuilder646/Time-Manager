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
    token = Enum.at(String.split(Enum.at(get_req_header(conn, "authorization"),0)),1)
    case Timemanager.Accounts.check_token(token) do
      {:ok, test} ->
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
      {:error, error} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{errors: "Not a good token"})
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

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: "Unable to delete user."})
        end
    end
  end

  # définir la route dans router
  def login(conn, %{"email" => email, "password" => password}) do
      case Timemanager.Accounts.login(email, password) do
        {:ok, token, user_id, user_role} ->
          IO.inspect(token, label: "Generated Token")
          json(conn, %{token: token, id: user_id, role: user_role})

        {:error, message} ->
          conn
          |> put_status(:unauthorized)
          |> json(%{error: "Invalid CSRF token: " + message})
      end
  end

  def check_token(conn, %{"token" => token}) do
    case Timemanager.Accounts.check_token(token) do
      {:ok, content} ->
        conn
        |> put_status(:ok)
        |> json(%{message: "Good token", role: Map.get(content, "role"), id: Map.get(content, "sub")})
      {:error, error} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{errors: "Not a good token"})
    end
  end
end
