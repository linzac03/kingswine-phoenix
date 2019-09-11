defmodule Kingswine.Repo do
  use Ecto.Repo,
    otp_app: :kingswine,
    adapter: Ecto.Adapters.Postgres
end
