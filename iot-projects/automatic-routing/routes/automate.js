const express = require('express');

let createRouter = function (rootResource){
	let router = express.Router();

    generateRoute(router, rootResource);

    return router;
};

function generateRoute(router, resource){
    if (resource.link){
        router.route(resource.link).get(function (req, res, next){
            let links = populateLinks(resource);
            res.links(links);
            req.result = resource;
            req.links = links;
            next();
        });
    }

    for (var key in resource){
        if (typeof resource[key] === "object"){
            generateRoute(router, resource[key]);
        }
    }
}

function populateLinks(resource){
    let linkObject = {};

    for (var key in resource){
        if (typeof resource[key] === "object"){
            let subResource = resource[key];
            if (subResource.link){
                linkObject[subResource.name] = subResource.link;
            }
        }
    }

    return linkObject;
}

module.exports = createRouter;