const httpServer = require('./servers/http'),
	wsServer = require('./servers/websockets'),
	resources = require('./resources/model');

const pirPlugin = require('./plugins/internal/pirPlugin'),
	dhtPlugin = require('./plugins/internal/dhtPlugin'),
	ledsPlugin = require('./plugins/internal/ledsPlugin');

pirPlugin.start({});
dhtPlugin.start({'frequency': 2000});
ledsPlugin.start({});

const server = httpServer.listen(resources.pi.port, function () {
	wsServer.listen(server);
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function () {
	pirPlugin.stop();
	dhtPlugin.stop();
	ledsPlugin.stop();
	process.exit();
});
