var mountie = require("mountie")
    , seaport = require("seaport")
    , ports = seaport.createServer()

ports.listen(10123)

var server = mountie(ports)
server.listen(8080)