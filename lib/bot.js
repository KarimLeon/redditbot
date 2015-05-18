var request = require('request');
var fs      = require('fs');

fs.readFile('settings.json', 'utf8', function(err, settings){
  
  settings = JSON.parse(settings);
  Object.keys(settings).forEach(function(setting){
    console.log(settings[setting])
  });
// request('http://www.google.com', function(err, resp, body){
//     console.log(resp);
//  }//)

});
