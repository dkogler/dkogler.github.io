var resources = require('./../../resources/model');

var interval, sensor;
var device = resources.pi.sensors.dht;
var pluginName = resources.pi.sensors.dht.name;
var localParams = {'frequency': 2000};

exports.start = function (params) {
	localParams = params ? params : localParams;
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

exports.stop = function () {
	clearInterval(interval);
	console.info(pluginName + " plugin stopped!");
};

function connectHardware() {
	var sensorDriver = require('node-dht-sensor');
	sensor = {
		initialize: function () {
			sensorDriver.initialize(device.model, device.gpio);
		},
		read: function () {
			var readout = sensorDriver.read();
			device.temperature.value = parseFloat(readout.temperature.toFixed(2));
			device.humidity.value = parseFloat(readout.humidity.toFixed(2));
			
		}
	};
	sensor.initialize();
	sensor.read();
	interval = setInterval(function () {
		sensor.read();
	}, localParams.frequency);
}

