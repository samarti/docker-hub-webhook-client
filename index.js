
var express = require('express');
var spawn   = require('child_process').spawn;
var app = express();
var PORT = 8080;
app.use(express.static(__dirname));

app.get('/', function(req, res){
  var command = spawn(__dirname + '/dclean.sh');
  var output  = [];

  command.stdout.on('data', function(chunk) {
    output.push(chunk);
  });

  command.on('close', function(code) {
    if (code === 0)
      res.send(Buffer.concat(output));
    else
      res.send(500); // when the script fails, generate a Server Error HTTP response
  });
});
app.listen(PORT);
