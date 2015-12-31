document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect(window.location.origin);
    var alias = window.location.pathname.slice(3);
    socket.on('connect', function() {
        socket.emit('register', alias);
    });
    socket.on('hit', function(url) {
        window.location.reload();
    });
});