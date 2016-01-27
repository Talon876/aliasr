var config = {};

config.port = 3001;

config.redis = {
    host: 'localhost',
    password: 'default',
    port: 6379
};

config.refresh = {
    interval: 5000
};

module.exports = config;