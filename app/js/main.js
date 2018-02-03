// socket.io specific code
var socket = io.connect();

// event from socketio
socket.on('connect', function () {
  $('#chat').addClass('connected');
});

// this event is send when a user joins or leaves the chat
socket.on('announcement', function (msg) {
  $('#lines').append($('<p>').append($('<em>').text(msg)));
});

socket.on('nicknames', function (nicknames) {
$('#nicknames').empty().append($('<span>Online: </span>'));
  for (var i in nicknames) {
    $('#nicknames').append($('<b>').text(nicknames[i]));
  }
});

socket.on('self message', s_message);
socket.on('user message', message);

socket.on('reconnect', function () {
  $('#lines').remove();
  message('System', 'Reconnected to the server');
});

socket.on('reconnecting', function () {
  message('System', 'Attempting to re-connect to the server');
});

socket.on('error', function (e) {
  message('System', e ? e : 'A unknown error occurred');
});

// overall function for adding a new line to the chat
function message (from, msg) {
  $('#lines').append("<p><span class='o_span'><b>"+from+": </b>"+msg+"</span></p>");
}

function s_message (from, msg) {
  $('#lines').append("<p align='right'><span class='s_span'>"+msg+"</span></p>");
}

// dom manipulation
$(function () {

  $('#set-nickname').submit(function (ev) {
    socket.emit('nickname', $('#nick').val(), function (set) {
      if (!set) {
        clear();
        return $('#chat').addClass('nickname-set');
      }
      $('#nickname-err').css('visibility', 'visible');
    });
    return false;
});

$('#send-message').submit(function () {
  var spellingHints = checkSpelling($('#message').val());
  s_message('SpellHints', spellingHints.length);
  s_message('me', $('#message').val());
  callBot($('#message').val());
  socket.emit('user message', $('#message').val());
  //socket.broadcast.emit('user message',$('#message').val());
  clear();
  $('#lines').get(0).scrollTop = 10000000;
  return false;
});

function callBot (msg) {
  var response = handleBotCall(msg);
  if (response != "") {
    message('Bot', response);
  }
}

function clear () {
  $('#message').val('').focus();
};
// for mobile side-nav-menu
$('.button-collapse').sideNav();

$('#english').click(function(e) {
  window.location.href = "chat.html";
});

});
