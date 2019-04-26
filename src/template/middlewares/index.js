module.exports = app => {
  app.use(require('./res'));
  app.middlewares = {
    bodyParser: require('body-parser'),
    ensureFields: require('./ensureFields')
  };
};