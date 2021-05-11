const express = require('express'),
	actuatorRoutes = require('./../routes/actuators'),
	resources = require('./../resources/model'),
	cors = require('cors'),
	converter = require('./../middleware/converter'),
	bodyParser = require('body-parser'),
    createRouter = require('./../routes/automate');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/pi/actuators', actuatorRoutes);

app.use('/', createRouter(resources));

app.use(converter());

module.exports = app;
