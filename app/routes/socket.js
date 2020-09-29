var express = require('express');
var WebSocket = require('ws');

var router = express.Router();

// chat
const ws = new WebSocket.Server({
  port:8080,
  path:'/chat'
});

ws.on('connection', function connection(ws) {
  console.log('server connection');
  ws.on('message', function (message) {
    var msg = JSON.parse(message);
    console.log(msg.username);
    broadcast(message);
  });
});

function broadcast(data) {
  ws.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

module.exports = router;
