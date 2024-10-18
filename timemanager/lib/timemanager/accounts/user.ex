defmodule Timemanager.Accounts.User do
  use Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :username, :email, :role, :inserted_at, :updated_at]}
  schema "users" do
    field :username, :string
    field :email, :string
    field :password, :string
    field :role, Ecto.Enum, values: [:employee, :manager, :topmanager]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, params \\ %{}) do
    user
    |> Ecto.Changeset.cast(params, [:username, :email, :password, :role])
    |> Ecto.Changeset.validate_required([:username, :email, :password], message: "can't be null")
    |> Ecto.Changeset.validate_format(:email, ~r/^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "X@X.X")
    |> putrole()
  end

  defp putrole(changeset) do
    if Ecto.Changeset.get_field(changeset, :role) != :manager and Ecto.Changeset.get_field(changeset, :role) != :topmanager do
      put_default_role(changeset)
    else
      changeset
    end
  end

  defp put_default_role(changeset) do
    Ecto.Changeset.put_change(changeset, :role, :employee)
  end
end
