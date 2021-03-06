const express = require('express'),
	actuatorRoutes = require('./../routes/actuators'),
	sensorRoutes = require('./../routes/sensors'),
	cors = require('cors');
	
const app = express();

app.use(cors());

app.use('/pi/actuators', actuatorRoutes);
app.use('/pi/sensors', sensorRoutes);

app.get('/', function (req, res) {
	res.send('Add "/pi" to the URL!');
});

app.get('/pi', function (req, res) {
	res.send('This is my Pi!');
});

module.exports = app;
