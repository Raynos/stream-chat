/*
    Pre load the dependencies for this app.

    You need a Connection to open a connection to the cloud based discovery network.

    You need a relayStreams to join a peer network and open streams to peer it's finds on your behalf
*/
var DiscoveryNetwork = require("discovery-network")
    , Connection = DiscoveryNetwork.Connection
    , RelayStreams = DiscoveryNetwork.RelayStreams
    , joinRoom = require("./components/joinRoom")
    , createRoom = require("./components/room")

/*
    Your now connected to a discovery network in the cloud!
*/
var conn = Connection("http://discoverynetwork.co/service")
    , room
    , rs

/*
    You told the cloud that you exist! Well done
*/
conn.identify()

/*
    Wait for the UI component to notify you of a join event
*/
joinRoom.on("join", openRoom)

function openRoom(roomName, userName) {
    /*
        If we had an open room or rs destroy those
    */
    if (room) {
        room.destroy()
    }
    if (rs) {
        rs.destroy()
    }

    /*
        Create a room UI component
    */
    room = createRoom(roomName, userName)

    /*
        connect to the relay network for raynos/stream-chat/:roomName.

        You will be notified of any peers in that relay network and will estabilish peer to peer connectiosn with them
    */
    rs = RelayStreams(conn, "raynos/stream-chat/" + roomName, handleStream)

    function handleStream(remotePeerId, stream) {
        /*
            You estabilished a peer to peer connection with the peer identified by it's remotePeerId. You now have a node stream directly to him.

            We are just going to pipe our room into him which is also a stream.
        */
        room.pipe(stream).pipe(room, {
            end: false
        })
    }
}