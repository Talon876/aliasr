var config = require('../config');
var Redis = require('ioredis');
var redis = new Redis(config.redis);
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var refreshCount = function () {
    redis.keys('alias:*', function (err, aliases) {
        if (!err) {
            redis.set('alias.count', aliases.length);
            ee.emit('counter.alias.count', aliases.length);
        }
    });
    setTimeout(refreshCount, config.refresh.interval || 60000);
};
refreshCount();

var getCounter = function (counter, callback) {
    redis.get(counter, function (err, size) {
        callback(err, size);
    });
};

var incrementCounter = function(counter) {
    getCounter(counter, function(err, size) {
        if (!err) {
            var newSize = parseInt(size) + 1;
            redis.set(counter, newSize);
            ee.emit('counter.' + counter, newSize);
        }
    });
};

module.exports = {
    getImage: function (alias, callback) {
        redis.get('alias:' + alias, function (err, url) {
            incrementCounter('visitor.count');
            callback(err, url);
        });
    },
    saveImage: function (alias, url) {
        redis.set('alias:' + alias, url);
        incrementCounter('alias.count');
        ee.emit('alias-set', {alias: alias, url: url});
    },
    onAliasSet: function (cb) {
        ee.on('alias-set', cb);
    },
    onAliasCountUpdate: function(cb) {
        ee.on('counter.alias.count', cb);
    },
    size: function(callback) {
        getCounter('alias.count', callback);
    },
    visits: function(callback) {
        getCounter('visitor.count', callback);
    }
};