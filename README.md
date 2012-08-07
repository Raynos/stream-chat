# stream-chat

A chat app using streams

## The interesting bits

Demonstrates usage of 

## [multi-channel-mdm backed by redis][1]

Multi channel MDM allows you to create real time communication channels that arbitary clients can pipe in and out from.

Backing the channel in redis allows you to distribute this.

## [client-side boot][2]

boot gives you access to a MDM object on the client from which you can open arbitary named streams.

boot itself handles reconnection logic for you like magic. Never worry about those pesky internet connections again

## [server-side boot][3]

On the server boot allows any browser to open a connection as a stream. You then have a single handler on which you can take any other stream and pipe it into it.

## [routing on streams][4]

You can attach an uri to a stream from MDM as meta data. This basically allows you to write a router for all your stream connections

No more pesky HTTP handlers. Just deal with streams and pipe all your IO!

## [UI widgets as streams][5]

Why expose some weird View or Model object when your UI widget can just be a stream. 

If the UI wants to report that some event or input happend it emits data like a readable stream, if your UI wants to render something, it is written to like a writable stream.

## [Load balance and scale with mountie][6]

Have mountie handle load balancing for you.

Split your application up into small chunks by the public HTTP API. Then use seaport to have these processes talk to each other.

Take advantage of the fact that mountie picks a random process if multiple match so you can spawn as many as you want for all your scaling needs

## Contributors

 - Raynos

## MIT Licenced

  [1]: hhttps://github.com/Raynos/stream-chat/blob/cdec62e0842b1d7472b4d2a4062e3a8cdfefc6fd/streams/index.js#L11
  [2]: https://github.com/Raynos/stream-chat/blob/cdec62e0842b1d7472b4d2a4062e3a8cdfefc6fd/web/client/index.js#L2
  [3]: https://github.com/Raynos/stream-chat/blob/a3a4e7dcc869601c71f3454a883fb332830b6679/index.js#L20
  [4]: https://github.com/Raynos/stream-chat/blob/a3a4e7dcc869601c71f3454a883fb332830b6679/index.js#L25
  [5]: https://github.com/Raynos/stream-chat/blob/cdec62e0842b1d7472b4d2a4062e3a8cdfefc6fd/web/client/room.js#L26
  [6]: https://github.com/Raynos/stream-chat/blob/cdec62e0842b1d7472b4d2a4062e3a8cdfefc6fd/index.js#L8