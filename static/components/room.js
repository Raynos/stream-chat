var through = require("through")
    , ENTER = 13

var chatRoom = document.getElementById("chat-room")
    , roomTitle = document.getElementById("room-title")
    , chatContent = document.getElementById("chat-content")
    , chatField = document.getElementById("chat-input")
    , chatButton = document.getElementById("chat-button")

module.exports = createRoom

function createRoom(roomName, userName) {
    /*
        The room is a stream which will renderMessage for every incoming chunk of data
    */
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

    /*
        When a user sends a message just emit this data on the room stream. Since we piped the room into our peers it will go directly to them and invoke renderMessage in their browsers!
    */
    function sendMessage() {
        var text = chatField.value

        chatField.value = ""

        room.emit("data", {
            message: text
            , user: userName
        })

        /*
            Make sure to render this message locally
        */
        renderMessage({
            message: text
            , user: "you"
        })
    }

    /*
        when we get incoming data from another peer, remember we piped the peer stream into this room.

        We will simply render the user's name and message and append that to the chat content
    */
    function renderMessage(data) {
        var message = data.user + ": " + data.message
            , elem = document.createElement("div")

        elem.textContent = message

        chatContent.appendChild(elem)
    }

    /*
        Make sure to cleanup all your resources and DOM hooks
    */
    function destroy() {
        chatRoom.hidden = true
        roomTitle.textContent = ""
        chatContent.textContent = ""
        chatField.value = ""
        chatField.removeEventListener("keyup", checkEnter)
        chatButton.removeEventListener("click", sendMessage)
        room.removeListener("close", destroy)
    }
}

function noop() {}