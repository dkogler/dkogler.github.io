var WebSocketServer = require('ws').Server,
	resources = require('./../resources/model'),
	utils = require('./../utils/utils');

var refreshRate = 10;

exports.listen = function (server) {
	var wss = new WebSocketServer({server: server});
	console.log("WebSocket server started");
	wss.on('connection', function (ws, req) {
		var url = req.url;
		
		var where = selectResource(url);
		
		if (!where) {
			console.log("could not observe " + url);
			return;
		}
		
		utils.monitor(where, refreshRate, function (changes) {
			ws.send(JSON.stringify(changes));
		});
	});
};

function selectResource(url) {
	var parts = url.split('/');
	console.log(parts);
	parts.shift();
	var result = resources;
	for (var i = 0; i < parts.length; i++) {
		result = result[parts[i]];
	}
	return result;
}


