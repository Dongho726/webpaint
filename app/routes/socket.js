var express = require('express');
var WebSocket = require('ws');

var router = express.Router();

// chat
// const wsChat = new WebSocket.Server({
//   port:8080,
//   path:'/chat'
// });
// const wsCanvas = new WebSocket.Server({
//   port:8080,
//   path:'/canvas'
// });

// wsChat.on('connection', function connection(wsChat) {
//   console.log('chatws');
//   wsChat.on('message', function (message) {
//     var msg = JSON.parse(message);
//     console.log(msg.username);
//     chatBroadcast(message);
//   });
// });
// function chatBroadcast(data) {
//   wsChat.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// }

module.exports = router;
