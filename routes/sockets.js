var io = require('socket.io');
var aliasdb = require('../aliasdb');

module.exports.listen = function(server) {
    var socket = io(server);

    socket.on('connection', function(client) {
        client.on('register', function(alias) {
            console.log('Client ' + client.id + ' is interested in alias ' + alias);
            client.join(alias);
        });
    });

    aliasdb.onAliasSet(function(data) {
        socket.to(data.alias).emit('alias-set', data.url);
    });

};