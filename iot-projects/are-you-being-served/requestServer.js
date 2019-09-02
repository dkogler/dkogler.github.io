var http = require("http");
var request = require("request");

var port = 8686;

var args = process.argv.slice(2);

http.createServer(function(req, res) {
    var url = args[0] ? args[0] : "https://dkogler.github.io";
    var type = args[1] === "html" ? "text/html" : "text/plain";

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, {'Content-Type': type})
            res.write(body);
        }
        else {
            res.writeHead(200, {'Content-Type': "text/plain"})
            res.write(error);
        }
        res.end();
    });

}).listen(port);
