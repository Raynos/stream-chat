var shoe = require("mux-demux-shoe")
    , mdm = shoe("/shoe")
    , es = require("event-stream")
    , through = require("through")
    , EventEmitter = require("events").EventEmitter
    , body = window.document.body

var roomDiv = document.createElement("div")
    , roomJoinBar = document.createElement("div")
    , titleBar = document.createElement("div")

var room = renderJoinRoom(roomJoinBar)
room.on("join", function (roomName, userName) {
    var roomStream = mdm.createStream("multi-channel-" + roomName)
    // Empty roomDiv
    roomDiv.textContent = ""
    var pair = renderRoom(roomDiv, roomName, userName)
        , write = pair[0]
        , read = pair[1]

    write.pipe(roomStream).pipe(read)
})

renderTitleAndLink(titleBar)

body.appendChild(titleBar)
body.appendChild(roomDiv)
body.appendChild(roomJoinBar)


function renderTitleAndLink(root) {
    var title = document.createElement("div")
        , description = document.createElement("div")
        , githubLink = document.createElement("a")

    githubLink.href = "https://github.com/Raynos/stream-chat"
    title.textContent = "welcome to stream chat!"
    description.textContent = "Experimental chat room build on streams. Try joining the test room!"

    root.appendChild(title)
    root.appendChild(description)
    root.appendChild(githubLink)
}

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

function renderRoom(root, roomName, userName) {
    var chatButton = document.createElement("button")
        , chatText = document.createElement("input")
        , roomTitle = document.createElement("div")
        , chatBox = document.createElement("div")
        , read = through()
        , write = through()

    read.on("data", function (data) {
        console.log("read from stream", data)
        var chatMessage = document.createElement("div")
        chatMessage.textContent = data.user + ": " + data.message
        chatBox.appendChild(chatMessage)
    })

    chatButton.textContent = "send message"
    chatButton.addEventListener("click", function () {
        console.log("writing to stream")
        write.write({
            user: userName
            , message: chatText.value
        })
    })

    roomTitle.textContent = roomName

    chatBox.placeholder = "chat message"

    root.appendChild(roomTitle)
    root.appendChild(chatBox)
    root.appendChild(chatText)
    root.appendChild(chatButton)

    return [write, read]
}