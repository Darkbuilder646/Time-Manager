defmodule Timemanager.Accounts.UserTeam do
  use Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :user_id, :team_id, :inserted_at, :updated_at]}
  schema "user_teams" do
    belongs_to :user, Timemanager.Accounts.User
    belongs_to :team, Timemanager.Accounts.Team

    timestamps(type: :utc_datetime)
  end
end
