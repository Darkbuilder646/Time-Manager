defmodule Timemanager.WorkingTimeFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Timemanager.WorkingTime` context.
  """

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2024-10-09 09:22:00],
        start: ~N[2024-10-09 09:22:00]
      })
      |> Timemanager.WorkingTime.create_workingtime()

    workingtime
  end
end
