defmodule KingswineWeb.PageController do
  use KingswineWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
