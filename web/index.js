var http = require("http")
    , browserify = require("browserify")
    , ecstatic = require("ecstatic")(__dirname)
    , Router = require("routes").Router
    , ports = require("seaport").connect(10123)

var httpRouter = new Router()
httpRouter.addRoute("/", ecstatic)
httpRouter.addRoute("/bundle.js", bundleBrowserify)

var server = http.createServer(httpHandler)

ports.register("web.localhost", startServer)

function httpHandler(req, res) {
    var route = httpRouter.match(req.url)
    if (route) {
        route.fn(req, res)
    }
}

function bundleBrowserify(req, res) {
    var b = browserify()
    b.addEntry("browser.js")
    res.setHeader("content-type", "application/jsonn")
    try {
        res.end(b.bundle())
    } catch (err) {
        res.statusCode = 500
        res.end(err.message)
    }
}

function startServer(port, ready) {
    server.listen(port, ready)
}