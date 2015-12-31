var config = require('../config');
var Redis = require('ioredis');
var redis = new Redis(config.redis);
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = {
    getImage: function (alias, callback) {
        redis.get('alias:' + alias, function(err, url) {
            callback(err, url);
        });
    },
    saveImage: function(alias, url) {
        redis.set('alias:' + alias, url);
        ee.emit('alias-set', {alias: alias, url: url});
    },
    onAliasSet: function(cb) {
        ee.on('alias-set', cb);
    }
};