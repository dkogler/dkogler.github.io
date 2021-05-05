const resources = require('./../../resources/model');

var actuator1, actuator2;
const model = resources.pi.actuators.leds;
const pluginName = resources.pi.actuators.leds[1].name + " " + resources.pi.actuators.leds[2].name;

exports.start = function (params) {
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

exports.stop = function () {
	actuator1.write(0);
	actuator2.write(0);
	actuator1.unexport();
	actuator2.unexport();
	console.info(pluginName + " plugin stopped!");
};

function connectHardware() {
	const Gpio = require('onoff').Gpio;
	actuator1 = new Gpio(model[1].gpio, 'out');
	actuator2 = new Gpio(model[2].gpio, 'out');
}

exports.switchOnOff = {
	1: function (value) {
		console.log("switching 1 to " + !!value);
		actuator1.write(value ? 1 : 0);
	},
	2: function (value) {
		console.log("switching 2 to " + !!value);
		actuator2.write(value ? 1 : 0);
	}
};


