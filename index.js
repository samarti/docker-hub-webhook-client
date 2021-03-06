var express = require('express');
var spawn   = require('child_process').spawn;
var app = express();
var fs = require('fs');
var PORT = 8001;
app.use(express.static(__dirname));

var sys = require('sys'),
    exec = require('child_process').exec;

app.get('/', function(req, res){
 exec(__dirname + '/builddev.sh',
  function (error, stdout, stderr) {

   });
  res.json({"Status":"Building dev"});
});

app.post('/', function(req, res){
  var secret = req.get("X-Hub-Signature");
  exec(__dirname + '/dclean.sh',
  function (error, stdout, stderr) {

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    fs.appendFile("/home/ubuntu/webhook.log", Date.now().toString(), function(err) {
    if(err) {
        return console.log(err);
    }
    });
    fs.appendFile("/home/ubuntu/webhook.log", stdout, function(err) {
    if(err) {
        return console.log(err);
    }
    });
    fs.appendFile("/home/ubuntu/webhook.log", stderr, function(err) {
    if(err) {
        return console.log(err);
    }
   });
   fs.appendFile("/home/ubuntu/webhook.log", "FIN \n\n\n\n\n", function(err) {
    if(err) {
        return console.log(err);
    }
   });
   if (error !== null) {
     console.log('exec error: ' + error);
	   }
   });
	res.json({"Status":"received"});
});

app.listen(PORT);
