var resources = require('./../../resources/model');

var sensor;
var model = resources.pi.sensors.dht;
var pluginName = resources.pi.sensors.dht.name;
var localParams = {'frequency': 2000};

exports.start = function (params) {
	localParams = params ? params : localParams;
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

exports.stop = function () {
	console.info(pluginName + " plugin stopped!");
};

function connectHardware() {
	var sensorDriver = require('node-dht-sensor');
	sensor = {
		initialize: function () {
			return sensorDriver.initialize(model.model, model.gpio);
		},
		read: function () {
			var readout = sensorDriver.read();
			model.temperature.value = parseFloat(readout.temperature.toFixed(2));
			model.humidity.value = parseFloat(readout.humidity.toFixed(2));
			
			setTimeout(function () {
				sensor.read();
			}, localParams.frequency);
		}
	};
	sensor.initialize();
	sensor.read();
}

