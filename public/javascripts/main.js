document.addEventListener('DOMContentLoaded', function() {
    io.set('browser client gzip', true);
    io.set('browser client minification', true);
    io.set('browser client etag', true);
    var socket = io.connect(window.location.origin);
    var alias = window.location.pathname.slice(3);
    socket.on('connect', function() {
        socket.emit('register', alias);
    });
    socket.on('alias-set', function(url) {
        window.location.reload();
    });
});