document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to aliasr!');
    var socket = io.connect(window.location.origin);
    var alias = window.location.pathname.slice(3);
    socket.on('connect', function() {
        socket.emit('register', alias);
    });
    socket.on('hit', function(url) {
        console.log('Alias ' + alias + ' set to ' + url);
        window.location.reload();
    });
});