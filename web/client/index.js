var boot = require("boot")
    , mdm = boot("/stream/boot")
    , es = require("event-stream")
    , through = require("through")
    , body = window.document.body

var roomDiv = document.createElement("div")
    , roomJoinBar = document.createElement("div")
    , titleBar = document.createElement("div")

var renderTitleAndLink = require("./titleAndLink")
    , renderJoinRoom = require("./joinRoom")
    , renderRoom = require("./room")

var room = renderJoinRoom(roomJoinBar)
room.on("join", function (roomName, userName) {
    var dataStream = mdm.createStream("/room/" + roomName)
    dataStream.on("data", function (d) {
        console.log("data", JSON.parse(d))
    })
    // Empty roomDiv
    roomDiv.textContent = ""
    var uiStream = renderRoom(roomDiv, roomName, userName)

    uiStream.pipe(dataStream).pipe(uiStream)
})

renderTitleAndLink(titleBar)

body.appendChild(titleBar)
body.appendChild(roomDiv)
body.appendChild(roomJoinBar)