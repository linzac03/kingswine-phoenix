// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import { Socket, Presence } from "phoenix"

let user = document.getElementById("user").innerText
let socket = new Socket("/socket", {params: {user: user}})
socket.connect()

let presences = {}

let formattedTimestamp = (Ts) => {
  let date = new Date(Ts)
  return date.toLocaleString()
}

let listBy = (user, {metas: metas}) => {
  return {
    user: user,
    onlineAt: formattedTimestamp(metas[0].online_at)
  }
}

let userLog = document.getElementById("userLog")
let render = (presences) => {
  actionLog.innerHtml = Presence.list(presences, listBy)
    .map(
      presence => `
        <li>
          ${presence.user}
          <br>
          <small>online since ${presence.onlineAt}</small>
        </li>
      `
    ).join("")
}

let room = socket.channel("room:lobby")
room.on("presence_state", state => {
  presences = Presence.syncState(presences, state)
  render(presences)
})

room.on("presence_diff", diff => {
  presences = Presence.syncDiff(presences, diff)
  render(presences)
})

room.join()

let actionInput = document.getElementById("playerAction")
actionInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13 && actionInput.value != "") {
    room.push("action:new", actionInput.value)
    actionInput.value = ""
  }
})

let actionLog = document.getElementById("actionLog")
let showAction = (action) => {
  let actionElement = document.createElement("li")
  actionElement.innerHTML = `
    <b>${action.user}</b>
    <i>${action.timestamp}</i>
    <p>${action.body}</p>
  `
  console.log(actionElement)
  actionLog.appendChild(actionElement)
  actionLog.scrollTop = actionLog.scrollHeight;
}

room.on("action:new", action => showAction(action))

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
