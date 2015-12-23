var express = require('express');
var spawn   = require('child_process').spawn;
var app = express();
var fs = require('fs');
var PORT = 8001;
app.use(express.static(__dirname));

var sys = require('sys'),
    exec = require('child_process').exec;

app.get('/', function(req, res){
  res.send("Working!");
});

app.post('/', function(req, res){
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
    fs.appendFile("/home/ubuntu/webhook.log", sterr, function(err) {
    if(err) {
        return console.log(err);
    }
   });
   if (error !== null) {
     console.log('exec error: ' + error);
   }
   });
});

app.listen(PORT);
