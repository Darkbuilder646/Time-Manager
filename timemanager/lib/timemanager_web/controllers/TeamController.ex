defmodule TimemanagerWeb.TeamController do
  use TimemanagerWeb, :controller

  alias Timemanager.Accounts
  # alias Timemanager.Accounts.UserTeam
  # alias Timemanager.Accounts.User

  action_fallback(TimemanagerWeb.FallbackController)

   # GET /api/users/:user_id/teams
   def teams(conn, %{"user_id" => id}) do
    case Accounts.get_team_ids_by_user_id(id) do
      [] ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Aucune équipe trouvée pour cet utilisateur."})

      teams ->
        teams_with_users = Enum.map(teams, fn {team_id, team_name} ->
          users = Accounts.get_usernames_by_team_ids([team_id])
          %{team_id: team_id, name: team_name, users: users}
        end)

        conn
        |> put_status(:ok)
        |> json(%{teams: teams_with_users})
    end
  end

    # GET /api/teams
    def all_teams(conn, _params) do
      teams = Accounts.get_all_teams_with_users()

      conn
      |> put_status(:ok)
      |> json(%{teams: teams})
    end

end
