# stream-chat

A chat app using streams

Live at: http://raynos.stream-chat.jit.su/

## The interesting bits

Demonstrates usage of using discoverynetwork.co to build distributed apps

# [The server is a static file server][1]

Distributed peer to peer apps are served from static file servers and use a discovery network in the cloud to establish peer to peer connections (through a relay server due to browser limitations)

# [Connections to the discovery network][2]

Open a connection to a cloud based discovery network. Then simply discover your peers and open connections to them

# [Open relay streams to a named relay network][3]

Once you have a connection to the discovery network you can open a fresh named connection to a relay network. Each relay network has a unique name and only contains the peers attached to that unique name.

# [Manipulate direct stream connections to peers][4]

When a peer enters the network you get a direct stream connection to him. Now just talk to him!

# [Your UI component is a stream][5]

If your UI component is a stream then you can pipe it directly to another peer. Once you get data from that peer simply render it. If you have data to send to the peer simply emit it.

# Start building distributed apps on the cloud today!

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://github.com/Raynos/stream-chat/blob/master/index.js#L1
  [2]: https://github.com/Raynos/stream-chat/blob/master/static/index.js#L7
  [3]: https://github.com/Raynos/stream-chat/blob/master/static/index.js#L21
  [4]: https://github.com/Raynos/stream-chat/blob/master/static/index.js#L23
  [5]: https://github.com/Raynos/stream-chat/blob/master/static/components/room.js#L13