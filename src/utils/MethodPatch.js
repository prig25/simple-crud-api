const { persons } = require('../data');
const { ERROR } = require('../const');
const errorHandler = require('./errorHandler')

class MethodPatch {
  updatePerson(request, response, id) {
    const isBody = request.headers['content-length'];
    if (+isBody !== 0) {
      request.on('data', chunk => {
        let body;
        try {
          body = JSON.parse(chunk.toString());
          const personIdx = persons.findIndex((person) => person.id === id);
          if (personIdx !== -1) {
            persons[personIdx].name = body.name || persons[personIdx].name;
            persons[personIdx].age = body.age || persons[personIdx].age;
            persons[personIdx].hobbies = [...(body.hobbies || persons[personIdx].hobbies)];
            response.setHeader("Content-Type", "application/json");
            response.statusCode = 200;
            response.end(JSON.stringify(persons[personIdx]));
          } else {
            errorHandler(response, ERROR.PERSON_NOT_FOUND);
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

module.exports = new MethodPatch();
