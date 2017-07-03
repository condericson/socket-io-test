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
		if ($('#m').val().length > 0) {
			socket.emit('chat message', $('#m').val());
			$('#m').val('');
		}
		return false;
	});

	// Handles receipt of messages
	socket.on('chat message', function(chatInfo){
		$('#messages').append(`<li><span class="username">${chatInfo.username}: ${chatInfo.msg}`);
		window.scrollTo(0, document.body.scrollHeight);
	});

	// Handles typing
	$('#m').on('keypress', function(e) {
		if (e.keyCode == 13) {
			socket.emit('typing', false);
		}
		else {
			socket.emit('typing', true);
		}

	})

	// Handles receipt of typing io.emit
	socket.on('typing', function(name){
		let myInterval;
		if (name == false) {
			clearInterval(myInterval);
			$('.typing').addClass('typing_hidden');
		}
		else {
			$('.typing').text(`${name} is typing...`);
			$('.typing').removeClass('typing_hidden');
			myInterval = setTimeout(function() {
				$('.typing').addClass('typing_hidden');
			}, 2000);
		}

	});


});