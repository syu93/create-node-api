const path = require('path');

module.exports = app => {
  // Load either config.json or config-dev.json, regarding the NODE_ENV variable
  const env = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev' ? '-dev' : '';
  const config = `./config${env}.json`;

  app.config = require(path.resolve(__dirname, config));
};