document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect(window.location.origin);
    socket.on('connect', function() {
        socket.emit('watch-alias-count');
    });
    socket.on('alias-count-update', function(count) {
        console.info('There are now ' + count + ' aliases.');
        var element = document.getElementById('aliasCountLabel');
        element.innerText = count + ' aliases have been created.';
    });
});
