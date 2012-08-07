var http = require("http")
    , RedisStore = require("redis-stream-store")
    , MultiChannel = require("multi-channel-mdm")
    , Router = require("routes").Router
    , boot = require("boot")

var redisStore = RedisStore(6379, "localhost", "stream-chat-prefix")
    , ports = require("seaport").connect(10123)

var streamRouter = new Router()
streamRouter.addRoute("/room/:streamName", MultiChannel(redisStore))

var sock = boot(streamHandler)
    , server = http.createServer()

ports.service("web.localhost", {
    mount: "/stream"
}, startServer)

function streamHandler(stream) {
    console.log("found a stream")
    var route = streamRouter.match(stream.meta)
    if (route) {
        route.fn(stream, route.params)
    }
}

function startServer(port, ready) {
    sock.install(server, "/boot")
    server.listen(port, ready)
    console.log("sock server listening on port", port)
}