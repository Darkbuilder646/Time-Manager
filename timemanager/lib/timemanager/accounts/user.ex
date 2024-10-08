defmodule Timemanager.Accounts.User do
  use Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :username, :email, :inserted_at, :updated_at]}
  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, params \\ %{}) do
    user
    |> Ecto.Changeset.cast(params, [:username, :email])
    |> Ecto.Changeset.validate_required([:username, :email], message: "can't be null")
    |> Ecto.Changeset.validate_format(:email, ~r/^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "X@X.X")
  end
end
