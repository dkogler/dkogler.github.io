var msgpack = require('msgpack5')();

module.exports = function() {
	return function (req, res, next) {
		if (req.result) {
			if (req.accepts('json')) {
				console.log("sending json");
				res.send(req.result);
				return;
			}
			if (req.accepts('application/x-msgpack')) {
				res.type('application/x-msgpack');
				console.log("sending msgpack");
				res.send(msgpack.encode(req.result));
				return;
			}
			console.log("sending json");
			res.send(req.result);
		}

		console.log("sending nothing");
		next();
	};
};
