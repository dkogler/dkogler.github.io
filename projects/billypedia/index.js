/* global $ _ opspark */

$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE //

       
        //TODO 3
        $('#section-bio').css('font-family', 'impact');
        $('#section-quotes').css('font-family', 'fantasy').css('color', 'green');
        
        //TODO 4
        let topRated = data.discography.topRated;
        for (var i = 0; i < topRated.length; i++){
            var $newTopRated = $('<li>').text(topRated[i].title + "\n").attr("class", "top-rated").attr("click-val", topRated[i].title.toLowerCase().replace(/ /g,"-"));
            $("#list-top-rated").append($newTopRated);
        }
        
        //TODO 5
        $("#sidebar").append($('<section>').attr("id", "section-recordings"));
        $("#section-recordings").append($('<ul>').attr("id", "list-recordings").attr("class", "list-recordings").css("color", "blue"));
        
        let recordings = data.discography.recordings;
        for (var i = 0; i < recordings.length; i++) {
            var $newRecording = $('<li>').attr("class", "recording").attr("click-val", recordings[i].title.toLowerCase().replace(/ /g,"-").replace(/'/g,""));
            $($newRecording).append($('<div>').attr("class", "title").text("Title: " + recordings[i].title));
            $($newRecording).append($('<div>').attr("class", "artist").text("Artist: " + recordings[i].artist));
            $($newRecording).append($('<div>').attr("class", "release").text("Release: " + recordings[i].release));
            $($newRecording).append($('<div>').attr("class", "year").text("Year: " + recordings[i].year));
            $("#list-recordings").append($newRecording);
        };

        //TODO 6
        var $imgTopRated = $("<div>").attr("id", "image-container-top-rated").attr("class", "image-container");
        $("#list-top-rated").prepend($imgTopRated);
        $("#image-container-top-rated").append($("<img>").attr("id", "top-rated-image").attr("class", "image").attr("src", "images/album/rejoice.jpg"));
        
        var $imgRecording = $("<div>").attr("id", "image-container-recording").attr("class", "image-container");
        $("#list-recordings").prepend($imgRecording);
        $("#image-container-recording").append($("<img>").attr("id", "recording-image").attr("class", "image").attr("src", "images/album/rejoicing.jpg"));


        //TODO 7
        var billyImage = 0;
        function handleBillyClick() {
            $("#image-billy").fadeOut("fast", function(){
                billyImage = (billyImage + 1) % 4;
                var imageURL = "images/billy/billy-" + billyImage + ".jpg";
                $("#image-billy").attr("src", imageURL);
                $("#image-billy").fadeIn("slow", function(){});
                // adds spinner to a native element, note [0] after the jQuery call! //
                const pacifier = opspark.makePacifier($('#image-container-billy')[0]);
            
                // stop the pacifier and remove it from the DOM //
                pacifier.stop();
            });

        }
        $("#image-billy").on("click", handleBillyClick);

        //TODO 8
        $(".top-rated").on("click", function () {
            var $clicked = $(this);
            var imageURL = "images/album/" + $clicked.attr('click-val') + ".jpg";
            $("#top-rated-image").attr("src", imageURL);
            console.log($clicked.attr('click-val'));
        });
        
        $(".recording").on("click", function () {
            var $clicked = $(this);
            var imageURL = "images/album/" + $clicked.attr('click-val') + ".jpg";
            $("#recording-image").attr("src", imageURL);
        });
        
        //TODO 9
        var createTable = function(rider){
            var createRow = function(piece){
                var $row = $("<tr>");
                var $type = $("<td>").text(piece.type);
                var $desc = $("<td>").text(piece.desc);
                $row.append($type);
                $row.append($desc);
                return $row;
            }
            var $table = $("<table>");
            for (var i = 0; i < rider.length; i++) {
                $table.append(createRow(rider[i]));
            }
            return $table;
        };
        var $riderDiv = $("<div>").attr("class", "rider").css("background-color", "cyan").css("color", "white");
        $riderDiv.appendTo("#all-contents");
        createTable(data.rider).appendTo($riderDiv);
        
        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});
