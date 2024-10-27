defmodule Timemanager.Accounts.Team do
  use Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :name, :inserted_at, :updated_at]}
  schema "teams" do
    field :name, :string
    many_to_many :users, Timemanager.Accounts.User, join_through: "user_teams"

    timestamps(type: :utc_datetime)
  end
end
