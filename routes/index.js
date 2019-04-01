module.exports = app => {
  app.use('/', require('./app')(app));
};