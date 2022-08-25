const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

const requestLogger = (request, response, next) => {
  logger.info("Request Method:", request.method);
  logger.info("Request Path:", request.path);
  logger.info("Request Body:", request.body);
  logger.info("---");

  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.message === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  } else if (error.message === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  requestLogger,
  errorHandler,
};
