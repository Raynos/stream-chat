var DiscoveryNetwork = require("discovery-network")
    , Connection = DiscoveryNetwork.Connection
    , RelayStreams = DiscoveryNetwork.RelayStreams
    , joinRoom = require("./components/joinRoom")
    , createRoom = require("./components/room")

var conn = Connection("http://discoverynetwork.co/service")
    , room

conn.identify()

joinRoom.on("join", openRoom)

function openRoom(roomName, userName) {
    if (room) {
        room.destroy()
    }
    
    room = createRoom(roomName, userName)

    RelayStreams(conn, "raynos/stream-chat/" + roomName, handleStream)

    function handleStream(remotePeerId, stream) {
        console.log("got stream", remotePeerId, stream)
        room.pipe(stream).pipe(room, {
            end: false
        })
    }
}