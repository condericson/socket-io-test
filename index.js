var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Endpoint for chatroom
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// To serve remaining files
app.use(express.static(__dirname + '/'));

// Object containing connected users
var users = {};

// Main socket function
io.on('connection', function(socket){
  console.log(`A user connected on socket ${socket.id}.`);
  


  // Handles a user inputting a nickname
  socket.on('user join', function(name){
    console.log(name);
    console.log(`user ${name} assigned to socket ${socket.id}`);
    users[socket.id] = name;
    io.emit('user join', users[socket.id]);
  });



  // Handles chat messages
  socket.on('chat message', function(msg){
    var chatInfo = {
      username: users[socket.id],
      msg: msg,
    };
    io.emit('chat message', chatInfo);
  });



  // Handles disconnect
  socket.on('disconnect', function(info){
    console.log(`${users[socket.id]} disconnected`);
    io.emit('user disconnect', users[socket.id]);
  });


});






// Acknowledging functional server
http.listen(port, function(){
  console.log('listening on *:' + port);
});
