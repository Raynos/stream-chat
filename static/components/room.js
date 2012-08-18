var through = require("through")
    , ENTER = 13

var chatRoom = document.getElementById("chat-room")
    , roomTitle = document.getElementById("room-title")
    , chatContent = document.getElementById("chat-content")
    , chatField = document.getElementById("chat-input")
    , chatButton = document.getElementById("chat-button")

module.exports = createRoom

function createRoom(roomName, userName) {
    var room = through(renderMessage, noop)

    chatRoom.hidden = false
    roomTitle.textContent = "Room: " + roomName

    chatField.addEventListener("keyup", checkEnter)
    chatButton.addEventListener("click", sendMessage)

    room.on("close", destroy)

    return room

    function checkEnter(event) {
        if (event.which === ENTER) {
            sendMessage()
        }
    }

    function sendMessage() {
        var text = chatField.value

        chatField.value = ""

        room.emit("data", {
            message: text
            , user: userName
        })

        renderMessage({
            message: text
            , user: "you"
        })
    }

    function renderMessage(data) {
        var message = data.user + ": " + data.message
            , elem = document.createElement("div")

        elem.textContent = message

        chatContent.appendChild(elem)
    }

    function destroy() {
        chatRoom.hidden = true
        roomTitle.textContent = ""
        chatContent.textContent = ""
        chatField.value = ""
    }
}

function noop() {}