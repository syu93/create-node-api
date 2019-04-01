module.exports = app => {
  app.actions = {
    part: require('./app')(app), // Load your action
  };
};