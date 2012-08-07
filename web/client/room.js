var es = require("event-stream")
    , through = require("through")

module.exports = renderRoom

function renderRoom(root, roomName, userName) {
    var chatButton = document.createElement("button")
        , chatText = document.createElement("input")
        , roomTitle = document.createElement("div")
        , chatBox = document.createElement("div")
        , read = through()
        , write = through(renderChatMessage)

    chatButton.textContent = "send message"
    chatButton.addEventListener("click", emitChatMessage)

    roomTitle.textContent = roomName

    chatBox.placeholder = "chat message"

    root.appendChild(roomTitle)
    root.appendChild(chatBox)
    root.appendChild(chatText)
    root.appendChild(chatButton)

    return es.duplex(write, read)

    function renderChatMessage(data) {
        data = JSON.parse(data)
        console.log("writing data")
        var chatMessage = document.createElement("div")
        chatMessage.textContent = data.user + ": " + data.message
        chatBox.appendChild(chatMessage)
    }

    function emitChatMessage() {
        console.log("emitting data")
        read.emit("data", JSON.stringify({
            user: userName
            , message: chatText.value
        }))
    }
}