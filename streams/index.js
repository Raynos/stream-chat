var http = require("http")
    , RedisStore = require("redis-store")
    , MultiChannel = require("multi-channel-mdm")
    , Router = require("routes").Router
    , boot = require("boot")

var redisStore = RedisStore(6379, "localhost")
    , ports = require("seaport").connect(10123)

var streamRouter = new Router()
streamRouter.addRoute("/room/:streamName", MultiChannel(redisStore))

var sock = boot(streamHandler)
    , server = http.createServer()

ports.register("web.localhost", {
    mount: "/boot"
}, startServer)

function streamHandler(stream) {
    var route = streamRouter.match(stream.meta)
    if (route) {
        route.fn(stream, route.params)
    }
}

function startServer(port, ready) {
    sock.install(server, "/")
    server.listen(port, ready)
}