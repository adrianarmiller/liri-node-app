require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var request = require('request');
var omdb = require('omdb');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if(process.argv[2] === "my-tweets"){
    var params = {screen_name: 'b11727034', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if(!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        }
    }
  });    
} else if(process.argv[2] === "spotify-this-song"){
    if(process.argv[3]){
        songName = process.argv[3];

        spotify.search({type: 'track', query: songName}, function(err, data) {
            if(err){
                console.log("There was an error");
            } else {
                let tune = data.tracks.items[0];
                console.log("Artist(s): " + tune.artists[0].name);
                console.log("Song Name " + tune.name );
                console.log("Preview: " + tune.preview_url);
                console.log("Album: " + tune.album.name);
            }
            
        });
    } else {
        songName = "The Sign";

        spotify.search({type: 'track', query: songName}, function(err, data) {
            if(err){
                console.log("There was an error");
            } else {
                let tune = data.tracks.items[0];
                console.log("Artist(s): Ace of Base");
                console.log("Song Name: The Sign");
                //console.log("Preview: " + tune.preview_url);
                //console.log("Album: " + tune.album.name);
                //^formulate for this song specifically
            }
            
        });
    }

    
} else if(process.argv[2] === "movie-this"){
    var queryURL = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (err, back, body) {
        if (!err && back.statusCode == 200) {
            var response = JSON.parse(body);

            console.log("Title: " + response.Title);
            console.log("Release: " + response.Released);
            console.log("IMDB Rating: " + response.imdbRating);
            console.log("Rotten Tomato Rating: " + response.Ratings[1]);
            console.log("Country: " +response.Country);
            console.log("Language: " + response.Language);
            console.log("Plot: " + response.Plot);
            console.log("Actors: " + response.Actors);
        } else {
            console.log("There has been an error");
        }
        
    });

} else if(process.argv[2] === "do-what-it-says"){
//
} else {
    console.log("Please enter a valid command");
}