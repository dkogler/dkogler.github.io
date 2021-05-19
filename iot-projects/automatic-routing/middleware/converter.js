const json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		if (req.result) {
			if (req.accepts('html')) {
				var transform = {'<>': 'div', 'html': [
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'Name: '},
						{'<>': 'p', 'html': '${name}'}
					]},
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'Description: '},
						{'<>': 'p', 'html': '${description}'}
					]},
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'Value: '},
						{'<>': 'p', 'html': '${value}'}
					]},
				]};
				console.log("sending html");
                		let response = json2html.transform(req.result, transform);
                		let links = generateLinks(req.links);
                
				res.send(response + links);
				return;
			}
			console.log("sending json");
			res.send(req.result);
		}

		console.log("sending nothing");
		next();
	};
};

function generateLinks(linkList){
    let html = "<h4> Links </h4>";
    for (link in linkList){
        html += "<a href="+linkList[link]+">"+link+"</a><br>";
    }
    return html;
}
