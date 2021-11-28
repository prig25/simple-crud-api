const { v4: uuidv4 } = require('uuid');

const { persons } = require('../data');
const { ERROR } = require('../const');
const errorHandler = require('./errorHandler')

class MethodPost {
  createPerson(request, response) {
    const isBody = request.headers['content-length'];
    if (+isBody !== 0) {
      request.on('data', chunk => {
        let body;
        try {
          body = JSON.parse(chunk.toString());
          if (body.name && body.age && body.hobbies) {
            const person = {
              id: uuidv4(),
              name: body.name,
              age: body.age,
              hobbies: [...body.hobbies]
            };
            persons.push(person);
            response.setHeader("Content-Type", "application/json");
            response.statusCode = 201;
            response.end(JSON.stringify(person));
          } else {
            errorHandler(response, ERROR.REQUIRED_FIELDS);
          }
        } catch {
          errorHandler(response, ERROR.UNKNOWN);
        }
      });
    } else {
      errorHandler(response, ERROR.UNKNOWN);
    }
  }
}

module.exports = new MethodPost();
