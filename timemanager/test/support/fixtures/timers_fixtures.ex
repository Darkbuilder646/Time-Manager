defmodule Timemanager.TimersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Timemanager.Timers` context.
  """

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~U[2024-10-07 12:56:00Z]
      })
      |> Timemanager.Timers.create_clock()

    clock
  end

  @doc """
  Generate a working_time.
  """
  def working_time_fixture(attrs \\ %{}) do
    {:ok, working_time} =
      attrs
      |> Enum.into(%{
        end: ~U[2024-10-07 12:56:00Z],
        start: ~U[2024-10-07 12:56:00Z]
      })
      |> Timemanager.Timers.create_working_time()

    working_time
  end
end
