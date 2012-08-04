var http = require("http")
    , shoe = require("mux-demux-shoe")
    , multiChannel = require("multi-channel-shoe")
    , browserify = require("browserify")
    , ecstatic = require("ecstatic")(__dirname + "/static")
    , server = http.createServer(function (req, res) {
        if (req.url === "/") {
            ecstatic(req, res)
        } else if (req.url === "/bundle.js") {
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
    })

server.listen(8080)
console.log("listening on port", 8080)

var sock = shoe(multiChannel(function (stream) {
    console.log("got a stream", stream.meta)
}))

sock.install(server, '/shoe');