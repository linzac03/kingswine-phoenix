defmodule KingswineWeb.RoomChannel do
  use KingswineWeb, :channel
  alias KingswineWeb.Presence
  
  def join("room:lobby", _, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    Presence.track(socket, socket.assigns.user, %{
      online_at: :os.system_time(:milli_seconds)
    })

    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_in("action:new", action, socket) do
    broadcast! socket, "action:new", %{
      user: socket.assigns.user,
      body: action,
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

end  
