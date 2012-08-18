/*
    Distributed apps are run of a static file server. browserify-server is basically a static file server but also browserifies the index.js path to enable node-style require's in the browser.

    In the future you would serve your entire web app purely of a CDN and use third party service on the cloud for all your other needs.
*/
var browserifyServer = require("browserify-server")

/*
    browserify is told to look in __dirname for a static folder and creates a HTTP server listening on port 8080
*/
browserifyServer.listen(__dirname, 8080)