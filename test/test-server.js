var http = require("http");
var port = 8686;

http.createServer(function(req,res){
  // handle response
  res.writeHeader(200, {'Content-Type': 'text/plain'});
  res.end("okey dokey lokey");
}).listen(port);

