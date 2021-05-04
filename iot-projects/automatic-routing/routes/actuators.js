var express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model'),
	ledsPlugin = require('./../plugins/internal/ledsPlugin');


router.route('/leds/:id').put(function(req, res, next) {
	var selectedLed = resources.pi.actuators.leds[req.params.id];
	selectedLed.value = req.body.value;
	req.result = selectedLed;
	ledsPlugin.switchOnOff[req.params.id](req.body.value);
    console.log("put run");
	next();
});

module.exports = router;

