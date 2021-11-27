const { persons } = require('../data');
const { ERROR } = require('../const');
const errorHandler = require('./errorHandler')

class MethodPut {
  replacePerson(request, response, id) {
    request.on('data', chunk => {
      let body;
      try {
        body = JSON.parse(chunk.toString());
        const personIdx = persons.findIndex((person) => person.id === id);
        if (personIdx !== -1) {
          if (body.name && body.age && body.hobbies) {
            persons[personIdx].name = body.name;
            persons[personIdx].age = body.age;
            persons[personIdx].hobbies = [...body.hobbies];
            response.setHeader("Content-Type", "application/json");
            response.statusCode = 200;
            response.end(JSON.stringify(persons[personIdx]));
          } else {
            errorHandler(response, ERROR.REQUIRED_FIELDS);
          }
        } else {
          errorHandler(response, ERROR.PERSON_NOT_FOUND);
        }
      } catch {
        errorHandler(response, ERROR.UNKNOWN);
      }
    });
  }
}

module.exports = new MethodPut();
