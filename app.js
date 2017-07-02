$(function () {
var socket = io();

// User functions

	// When a nickname is entered
	$('#nicknameEntryForm').submit(function(){
		socket.emit('user join', $('#userNicknameEntry').val());
		$('#signInModal').addClass('hidden');
		return false;
	});

	// Handles joining of users
	socket.on('user join', function(name){
		$('#messages').append($('<li>').text(`${name} has joined the chat!`));
		window.scrollTo(0, document.body.scrollHeight);
	});

	// Handles disconnection of users
	socket.on('user disconnect', function(name){
		$('#messages').append($('<li>').text(`${name} has disconnected`));
		window.scrollTo(0, document.body.scrollHeight);
	});


// Chat functions

	// When a message is sent
	$('#messageEntryForm').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	// Handles receipt of messages
	socket.on('chat message', function(chatInfo){
		$('#messages').append(`<li><span class="username">${chatInfo.username}: ${chatInfo.msg}`);
		window.scrollTo(0, document.body.scrollHeight);
	});
	
	

});