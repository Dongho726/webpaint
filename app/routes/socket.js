var express = require('express');
var WebSocket = require('ws');

var router = express.Router();

 const ws = new WebSocket.Server({
   port:8080
 });

 ws.on('connection', function connection(WS) {
   WS.on('message', function (message) {
     var msg = JSON.parse(message);
     console.log(msg.username);
     chatBroadcast(message);
   });
 });
 function chatBroadcast(data) {
   ws.clients.forEach((client) => {
     if (client.readyState === WebSocket.OPEN) {
       client.send(data);
     }
   });
 }

module.exports = router;
