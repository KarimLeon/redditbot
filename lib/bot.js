//get the request program
var request = require('request');

// get the file system program because we gonna read a file (settings.json)
var fs      = require('fs');

// using fs(filesystem) to read the json file
fs.readFile('settings.json', 'utf8', function(err, settings){
 
// turn the json file into actual javascript aka parse
  settings = JSON.parse(settings);
 
// loop over each key in the hash(object) 
  Object.keys(settings["sub-reddits"]).forEach(function(setting){
//  now we have to find each url in the settings so we can pass it to request
	setting = settings["sub-reddits"][setting];
     request( setting["url"], function( err, res, bod ){
		// we parse what we got back to json so it can be pretty and not a mess
		bod = JSON.parse(bod);
		 // next step is loop over each of the stories and pull out the title to see if we got a match
		 //lets test to see only story titles
		 bod["data"]["children"].forEach(function( story){
		 // lets split the terms because they look like this "term, term, term" split on comma
			setting["terms"].split(/,/).forEach(function(term){
				//to get better match lets not use 'indexOf' but instead use 'match'
				// trim() removes spaces from strings so we get "this" instead of " this"
				term = term.trim()
				//the \b mean word boundry, basically says its a whole word and not part of another word
				// just noticed we can't use variable in match like that we need to do
				if(story["data"]["title"].match(new RegExp('\\b' + term + '\\b', 'gi'))){
					console.log(" ---------");
					console.log( "Term: " + term.trim());
					console.log(" Matches: " + story["data"]["title"]);
				}
			})
		 })
	 })
  });
});
