module.exports = app => {
  app.actions = {
    app: require('./app')(app), // Load your action
  };
};