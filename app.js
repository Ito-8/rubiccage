var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var path = require('path');
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".png": "image/png",
  ".gif": "image/gif"
  // 読み取りたいMIMEタイプはここに追記
};

var server = new http.createServer(function(req, res) {

    if (req.url == '/') {
      filePath = '/index.html';
    } else {
      filePath = req.url;
    }
    var fullPath = __dirname + filePath;
  
    res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
    fs.readFile(fullPath, function(err, data) {
      if (err) {
        // エラー時の応答
      } else {
        res.end(data, 'UTF-8');
      }
    });
}).listen(3000);

var io = socketio(server);
 
io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        console.log(data);
        console.log(data.value);
        io.sockets.emit('server_to_client', {value : data.value});
    });
});