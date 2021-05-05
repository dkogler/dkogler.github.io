const resources = require('./../../resources/model');

var sensor;
const model = resources.pi.sensors.pir;
const pluginName = resources.pi.sensors.pir.name;


exports.start = function (params) {
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

exports.stop = function () {
	sensor.unexport();
	console.info(pluginName + " plugin stopped!");
};

function connectHardware() {
	const Gpio = require('onoff').Gpio;
	sensor = new Gpio(model.gpio, 'in', 'both');
	sensor.watch(function (err, value) {
		if (err) {
			exit(err);
		}
		model.value = !!value;
		//console.log(model.value ? "Detected something!" : "Detecting nothing!");
	});
}

