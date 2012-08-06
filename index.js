var http = require("http")
    , boot = require("boot")
    , MultiChannel = require("multi-channel-mdm")
    , browserify = require("browserify")
    , ecstatic = require("ecstatic")(__dirname + "/static")
    , Router = require("routes").Router

var httpRouter = new Router()
httpRouter.addRoute("/", ecstatic)
httpRouter.addRoute("/bundle.js", bundleBrowserify)

var server = http.createServer(httpHandler)

server.listen(8080)
console.log("listening on port", 8080)

var streamRouter = new Router()
streamRouter.addRoute("/room/:streamName", MultiChannel())

var sock = boot(streamHandler)

sock.install(server, '/boot')
console.log("sock hooked on", "/boot")

function streamHandler(stream) {
    var route = streamRouter.match(stream.meta)
    if (route) {
        route.fn(stream, route.params)
    }
}

function httpHandler(req, res) {
    var route = httpRouter.match(req.url)
    if (route) {
        route.fn(req, res)
    }
}

function bundleBrowserify(req, res) {
    var b = browserify()
    b.addEntry("client/index.js")
    res.setHeader("content-type", "application/jsonn")
    try {
        res.end(b.bundle())
    } catch (err) {
        res.statusCode = 500
        res.end(err.message)
    }
}