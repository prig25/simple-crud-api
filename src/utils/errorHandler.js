const { ERROR } = require('../const');

function errorHandler(response, errorCode) {
  response.setHeader("Content-Type", "application/json");

  switch (errorCode) {
    case ERROR.PERSON_ID_NOT_VALID:
      response.statusCode = 400;
      response.end(JSON.stringify({
        message: "Person id not valid..."
      }));
      break;
    case ERROR.REQUIRED_FIELDS:
      response.statusCode = 400;
      response.end(JSON.stringify({
        message: "The request body does not contain required fields..."
      }));
      break;
    case ERROR.ENDPOINT_NOT_EXIST:
      response.statusCode = 404;
      response.end(JSON.stringify({
        message: "Resource that you requested doesn't exist..."
      }));
      break;
    case ERROR.PERSON_NOT_FOUND:
      response.statusCode = 404;
      response.end(JSON.stringify({
        message: "Person not found..."
      }));
      break;
    case ERROR.UNKNOWN:
      response.statusCode = 500;
      response.end(JSON.stringify({
        message: "Error with code 500..."
      }));
      break;
  }
}

module.exports = errorHandler;
