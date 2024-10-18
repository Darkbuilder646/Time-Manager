defmodule Timemanager.Repo.Migrations.AddPasswordToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :password, :string
      add :role, :string, enum: [:employee, :manager, :topmanager]
    end
  end
end
