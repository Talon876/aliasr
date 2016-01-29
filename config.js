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

var configFile = process.env.ALIASR_CONFIG;

if (configFile) {
    console.log('Loading config from ' + configFile);
    module.exports = require('./' + configFile);
} else {
    module.exports = config;
}
