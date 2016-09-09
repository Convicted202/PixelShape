const env = process.env.NODE_ENV || 'dev';

const config = require(`./webpack.config.${env}.js`);

module.exports = config;
