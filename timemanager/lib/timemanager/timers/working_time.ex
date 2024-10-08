defmodule Timemanager.Timers.WorkingTime do
  use Ecto.Schema

  schema "workingtimes" do
    field :start, :utc_datetime
    field :end, :utc_datetime
    belongs_to :user, Timemanager.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(workingtime, params \\ %{}) do
    workingtime
    |> Ecto.Changeset.cast(params, [:start, :end, :user_id])
    |> Ecto.Changeset.validate_required([:start, :end, :user_id], message: "can't be null")
    |> Ecto.Changeset.validate_format(:start, ~r/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|\d{2})$/, message: "YYYY-MM-DD HH:mm:ss")
    |> Ecto.Changeset.validate_format(:end, ~r/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|\d{2})$/, message: "YYYY-MM-DD HH:mm:ss")
  end
end
