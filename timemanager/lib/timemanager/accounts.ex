defmodule Timemanager.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Timemanager.Repo

  alias Timemanager.Accounts.User
  alias Timemanager.Accounts.{User, UserTeam, Team}
  alias Bcrypt

  alias Joken

  @jwt_secret "JWT_SECRET"

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users(params) do
    User
    |> build_query(params)
    |> Repo.all()
  end

  defp build_query(query, %{"email" => email, "username" => username}) when is_binary(email) and is_binary(username) do
    from u in query,
    where: u.email == ^email and u.username == ^username
  end

  defp build_query(query, %{"email" => email}) when is_binary(email) do
    from u in query,
    where: u.email == ^email
  end

  defp build_query(query, %{"username" => username}) when is_binary(username) do
    from u in query,
    where: u.username == ^username
  end

  defp build_query(query, _params), do: query

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  hash the password
  """
  def hash_password(password) do
    Bcrypt.hash_pwd_salt(password)
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    hashed_password = hash_password(Map.get(attrs, "password"))

    %User{}
    |> User.changeset(Map.put(attrs, "password", hashed_password))
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    hashed_password = hash_password(Map.get(attrs, "password"))

    user
    |> User.changeset(Map.put(attrs, "password", hashed_password))
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  @doc """
  Log in an existing user and return a JWT token.

  ## Examples

      iex> login("username", "password")
      {:ok, token} # on succès
      {:error, "Invalid credentials"} # sur échec
  """
  def login(email, password) do
    user = Repo.get_by(User, email: email)

    cond do
      user && check_password(user, password) ->
        token = generate_token(user.id, user.role)
        {:ok, token, user.id, user.role}

      true ->
        {:error, "Invalid credentials"}
    end
  end

  defp check_password(user, password) do
    Bcrypt.verify_pass(password, user.password)
  end

  defp generate_token(user_id, user_role) do
    claims = %{
      "sub" => user_id,
      "role" => user_role,
      "exp" => Joken.current_time() + 30 * 24 * 60 * 60
    }

    {:ok, first_token, _claims} = Timemanager.Auth.generate_and_sign()

    full_token = Timemanager.Auth.generate_and_sign!(claims)
    full_token
  end

  def check_token(token) do
    content = Timemanager.Auth.verify_and_validate(token)
    content
  end

  alias Timemanager.Accounts.User
  import Ecto.Query, only: [from: 2]

  def get_team_ids_by_user_id(user_id) do
    from(ut in Timemanager.Accounts.UserTeam,
    where: ut.user_id == ^user_id,
    join: t in Timemanager.Accounts.Team,
    on: t.id == ut.team_id,
    select: {ut.team_id, t.name}
    )
    |> Timemanager.Repo.all()
  end

  def get_usernames_by_team_ids(team_ids) do
    from(ut in Timemanager.Accounts.UserTeam,
      where: ut.team_id in ^team_ids,
      join: u in Timemanager.Accounts.User,
      on: u.id == ut.user_id,
      select: %{id: u.id, username: u.username}
    )
    |> Repo.all()
  end


  def get_all_teams_with_users do
    from(t in Team,
      join: ut in UserTeam, on: ut.team_id == t.id,
      join: u in User, on: u.id == ut.user_id,
      select: %{
        team_id: t.id,
        name: t.name,
        username: u.username,
        email: u.email
      }
    )
    |> Repo.all()
    |> Enum.group_by(& &1.team_id)
    |> Enum.map(fn {team_id, members} ->
      %{
        team_id: team_id,
        name: List.first(members).name,
        users: Enum.map(members, fn member ->
          %{username: member.username, email: member.email}
        end)
      }
    end)
  end

end
