//this is the node-server which handles requests and the socketio
var express =require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('files'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('user message', function (msg) {
   socket.broadcast.emit('user message', socket.nickname, msg);
 });

 socket.on('nickname', function (nick, fn) {
   if (nicknames[nick]) {
     fn(true);
   } else {
     fn(false);
     nicknames[nick] = socket.nickname = nick;
     socket.broadcast.emit('announcement', nick + ' connected');
     io.sockets.emit('nicknames', nicknames);
   }
 });

 socket.on('disconnect', function () {
   if (!socket.nickname) return;

   delete nicknames[socket.nickname];
   socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
   socket.broadcast.emit('nicknames', nicknames);
 });
});
