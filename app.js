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
}).listen(process.env.PORT || 3000);

var io = socketio(server);
var cagelist = [
  ["./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif"],
  ["./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif"],
  ["./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif"]
];
var cube ={blue : 4, green : 4, purple : 4, orange : 4, red : 4, yellow : 4};

function gravity_phase(){
  for(let i = 0; i < 8; i++){
    for(j = 0; j < 2; j++){
      for(let k = 2; k > 0; k--){
        if(cagelist[k][i] == "./img/blank.gif"){
          if(cagelist[k-1][i] != "./img/blank.gif"){
            cagelist[k][i] = cagelist[k-1][i];
            cagelist[k-1][i] = "./img/blank.gif";
          } 
        }
      }
    }
  }
}

let tmp1;
let tmp2;

io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
      switch(data.ope){
        case 'down':
          if(data.sokumen == 1){
            if(data.e_target == "down_left"){
              cagelist[0][0] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_center"){
              cagelist[0][1] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_right"){
              cagelist[0][2] = "./img/".concat(data.color, ".gif");
            }
          }else if(data.sokumen == 2){
            if(data.e_target == "down_left"){
              cagelist[0][2] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_center"){
              cagelist[0][3] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_right"){
              cagelist[0][4] = "./img/".concat(data.color, ".gif");
            }
          }else if(data.sokumen == 3){
            if(data.e_target == "down_left"){
              cagelist[0][4] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_center"){
              cagelist[0][5] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_right"){
              cagelist[0][6] = "./img/".concat(data.color, ".gif");
            }
          }else if(data.sokumen == 4){
            if(data.e_target == "down_left"){
              cagelist[0][6] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_center"){
              cagelist[0][7] = "./img/".concat(data.color, ".gif");
            }else if(data.e_target == "down_right"){
              cagelist[0][0] = "./img/".concat(data.color, ".gif");
            }
          }
          gravity_phase();
          cube[data.color] = cube[data.color] - 1
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'left0':
          tmp1 = cagelist[0][0];
          tmp2 = cagelist[0][1];
          cagelist[0][0]=cagelist[0][2];
          cagelist[0][1]=cagelist[0][3];
          cagelist[0][2]=cagelist[0][4];
          cagelist[0][3]=cagelist[0][5];
          cagelist[0][4]=cagelist[0][6];
          cagelist[0][5]=cagelist[0][7];
          cagelist[0][6]=tmp1;
          cagelist[0][7]=tmp2;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'right0':
          tmp1 = cagelist[0][0];
          tmp2 = cagelist[0][1];
          cagelist[0][1]=cagelist[0][7];
          cagelist[0][0]=cagelist[0][6];
          cagelist[0][7]=cagelist[0][5];
          cagelist[0][6]=cagelist[0][4];
          cagelist[0][5]=cagelist[0][3];
          cagelist[0][4]=cagelist[0][2];
          cagelist[0][3]=tmp2;
          cagelist[0][2]=tmp1;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'left1':
          tmp1 = cagelist[1][0];
          tmp2 = cagelist[1][1];
          cagelist[1][0]=cagelist[1][2];
          cagelist[1][1]=cagelist[1][3];
          cagelist[1][2]=cagelist[1][4];
          cagelist[1][3]=cagelist[1][5];
          cagelist[1][4]=cagelist[1][6];
          cagelist[1][5]=cagelist[1][7];
          cagelist[1][6]=tmp1;
          cagelist[1][7]=tmp2;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'right1':
          tmp1 = cagelist[1][0];
          tmp2 = cagelist[1][1];
          cagelist[1][1]=cagelist[1][7];
          cagelist[1][0]=cagelist[1][6];
          cagelist[1][7]=cagelist[1][5];
          cagelist[1][6]=cagelist[1][4];
          cagelist[1][5]=cagelist[1][3];
          cagelist[1][4]=cagelist[1][2];
          cagelist[1][3]=tmp2;
          cagelist[1][2]=tmp1;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'left2':
          tmp1 = cagelist[2][0];
          tmp2 = cagelist[2][1];
          cagelist[2][0]=cagelist[2][2];
          cagelist[2][1]=cagelist[2][3];
          cagelist[2][2]=cagelist[2][4];
          cagelist[2][3]=cagelist[2][5];
          cagelist[2][4]=cagelist[2][6];
          cagelist[2][5]=cagelist[2][7];
          cagelist[2][6]=tmp1;
          cagelist[2][7]=tmp2;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'right2':
          tmp1 = cagelist[2][0];
          tmp2 = cagelist[2][1];
          cagelist[2][1]=cagelist[0][7];
          cagelist[2][0]=cagelist[0][6];
          cagelist[2][7]=cagelist[0][5];
          cagelist[2][6]=cagelist[0][4];
          cagelist[2][5]=cagelist[0][3];
          cagelist[2][4]=cagelist[0][2];
          cagelist[2][3]=tmp2;
          cagelist[2][2]=tmp1;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;                      
        case 'reload':
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'rotate':
          // let tmprow0 = cagelist[0].slice();
          // let tmprow1 = cagelist[1].slice();
          // let tmprow2 = cagelist[2].slice();
          // tmprow0.reverse();
          // tmprow1.reverse();
          // tmprow2.reverse();
          // cagelist[0] = tmprow2.slice();
          // cagelist[1] = tmprow1.slice();
          // cagelist[2] = tmprow0.slice();

          let cagelisttmp = [
            [cagelist[2][2], cagelist[2][1], cagelist[2][0], cagelist[2][7], cagelist[2][6], cagelist[2][5], cagelist[2][4], cagelist[2][3],],
            [cagelist[1][2], cagelist[1][1], cagelist[1][0], cagelist[1][7], cagelist[1][6], cagelist[1][5], cagelist[1][4], cagelist[1][3],],
            [cagelist[0][2], cagelist[0][1], cagelist[0][0], cagelist[0][7], cagelist[0][6], cagelist[0][5], cagelist[0][4], cagelist[0][3],]
          ]
          cagelist = cagelisttmp;
          gravity_phase();
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        case 'reset':
          cagelist = [
            ["./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif"],
            ["./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif"],
            ["./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif","./img/blank.gif"]
          ];
          cube = {blue : 4, green : 4, purple : 4, orange : 4, red : 4, yellow : 4};

          }
          io.sockets.emit('server_to_client', {cagelist, cube});
          break;
        default:
          break;
      }
    });
});