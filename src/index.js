const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler.middleware');
const successResponseMiddleware = require('./middlewares/successResponse.middleware');
require('dotenv');
const app = express();

/*
  body-parser: Parse incoming request bodies in a middleware before your handlers, 
  available under the req.body property.
*/
app.use(bodyParser.json());

// Handling Success Responses
app.use(successResponseMiddleware);

app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 4000}`);
});
