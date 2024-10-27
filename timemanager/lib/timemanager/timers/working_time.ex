defmodule Timemanager.Timers.WorkingTime do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :start, :end, :user_id, :inserted_at, :updated_at]}
  schema "workingtimes" do
    field :start, :utc_datetime
    field :end, :utc_datetime
    belongs_to :user, Timemanager.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  @derive Jason.Encoder
  def changeset(workingtime, params \\ %{}) do
    workingtime
    |> cast(params, [:start, :end, :user_id])
    |> validate_required([:start, :end, :user_id])
  end
end
