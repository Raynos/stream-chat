var DiscoveryNetwork = require("discovery-network")
    , Connection = DiscoveryNetwork.Connection
    , RelayStreams = DiscoveryNetwork.RelayStreams
    , joinRoom = require("./components/joinRoom")
    , createRoom = require("./components/room")

var conn = Connection("http://discoverynetwork.co/service")
    , room
    , rs

conn.identify()

joinRoom.on("join", openRoom)

function openRoom(roomName, userName) {
    if (room) {
        room.destroy()
    }
    if (rs) {
        rs.destroy()
    }

    room = createRoom(roomName, userName)

    rs = RelayStreams(conn, "raynos/stream-chat/" + roomName, handleStream)

    function handleStream(remotePeerId, stream) {
        console.log("got stream", remotePeerId, stream)
        stream.on('data', function (d) {
            console.log("incoming data", d)
        })
        room.pipe(stream).pipe(room, {
            end: false
        })
    }
}