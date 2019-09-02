var http = require("http");
var async = require("async");

var port = 8686;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    let racers = ["Green Ambler", "Catalack", "Steel Runner", "G.I. Jogger"];

    // TODO 6: Get the start time for the race
    let d = new Date();
    let startTime = d.getTime();

    // TODO 11: Make the whole thing parallel
    async.series( 
        // TODO 8: Supply an array of functions
        [
            function(callback){
                wrapper(callback);
            },
            function(callback){
                wrapper(callback);
            },
            function(callback){
                wrapper(callback);
            },
            function(callback){
                wrapper(callback);
            }
        ],
        function (error, results) {
            // TODO 9: add a callback function to the end of the async call to tally the results 

            res.write("Results:\n");
            
            var victoryOrder = sortTogether(racers, results);
            
            for (var i = 0; i < victoryOrder.length; i++){
                res.write(i + " " + victoryOrder[i] + "\n");
            }
            
            let d = new Date();
            let stopTime = d.getTime();
            res.end("Total time: " + (stopTime - startTime + "\n"));
        }
    );
    
}).listen(port);

// TODO 7: create a common function to be called by all functions in the array passed to the async function
function wrapper(callback){
    setTimeout(function () {
        let d = new Date();
        callback(null, d.getTime());
    }, Math.random()*1000);
}

function sortTogether(names, times) {
    var tempList = [];
    for (var i = 0; i < names.length; i++) {
        tempList.push({'name': names[i], 'time': times[i]});
    }

    tempList.sort(function(a, b) {
        return ((a.time < b.time) ? -1 : ((a.time == b.time) ? 0 : 1));
    });

    for (var i = 0; i < tempList.length; i++) {
        names[i] = tempList[i].name;
    }
    return names;
}