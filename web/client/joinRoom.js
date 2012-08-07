var EventEmitter = require("events").EventEmitter

module.exports = renderJoinRoom

function renderJoinRoom(root) {
    var roomName = document.createElement("input")
        , userName = document.createElement("input")
        , joinButton = document.createElement("button")
        , ee = new EventEmitter()

    joinButton.textContent = "join room"
    joinButton.addEventListener("click", function () {
        ee.emit("join", roomName.value, userName.value)
    })

    roomName.placeholder = "room name"
    userName.placeholder = "user name"

    root.appendChild(roomName)
    root.appendChild(userName)
    root.appendChild(joinButton)

    return ee
}