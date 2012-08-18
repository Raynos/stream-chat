var EventEmitter = require("events").EventEmitter
    , LocalStore = require("local-store").createStore
    , ENTER = 13

var roomField = document.getElementById("room-name")
    , userField = document.getElementById("user-name")
    , roomButton = document.getElementById("room-button")
    , roomStore = LocalStore("room-store")
    , room = new EventEmitter()

roomField.value = roomStore.get("room-name")
userField.value = roomStore.get("user-name")

roomButton.addEventListener("click", join)
userField.addEventListener("keyup", checkEnter)
roomField.addEventListener("keyup", checkEnter)

module.exports = room

/*
    When a user clicks the button just grab the data from the DOM and emit the join event
*/
function join() {
    var roomName = roomField.value
        , userName = userField.value

    roomStore.set("room-name", roomName)
    roomStore.set("user-name", userName)

    roomField.value = ""
    userField.value = ""

    room.emit("join", roomName, userName)
}

function checkEnter(event) {
    if (event.which === ENTER) {
        join()
    }
}