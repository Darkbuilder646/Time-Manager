defmodule Timemanager.Timers.Clock do
  use Ecto.Schema

  schema "clocks" do
    field :time, :utc_datetime
    field :status, :boolean, default: true
    belongs_to :user, Timemanager.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(clocks, params \\ %{}) do
    clocks
    |> Ecto.Changeset.cast(params, [:time, :status, :user_id])
    |> Ecto.Changeset.validate_required([:time, :status, :user_id], message: "can't be null")
  end
end
