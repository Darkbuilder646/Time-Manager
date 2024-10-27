defmodule Timemanager.Repo.Migrations.CreateUserTeamTable do
  use Ecto.Migration

  def change do
      create table(:user_teams) do
        add :user_id, references(:users, on_delete: :delete_all)
        add :team_id, references(:teams, on_delete: :delete_all)

        timestamps(type: :utc_datetime)
      end

      create unique_index(:user_teams, [:user_id, :team_id])
  end
end
