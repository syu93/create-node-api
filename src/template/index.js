const express = require('express');

// Initialise the main express application server
const app = express();


// Loading applicatin stack
require('./config')(app); console.log("Loading config ...");
require('./boot')(app); app.logger.info("Booting application ...");
require('./helpers')(app);  app.logger.info("Loading helpers ...");
require('./models')(app); app.logger.info("Loading models ...");
require('./middlewares')(app);  app.logger.info("Loading middlewares ...");
require('./actions')(app);  app.logger.info("Loading actions ...");
require('./routes')(app); app.logger.info("Loading routes ...");

app.logger.info(`App listening on http://localhost:${app.config.port}`);
app.listen(app.config.port);
