const { persons } = require('../data');
const { ERROR } = require('../const');
const errorHandler = require('./errorHandler')

class MethodGet {
  getPersons(response) {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    response.end(JSON.stringify(persons));
  }

  getPersonById(response, id) {
    persons.length === 0 && errorHandler(response, ERROR.PERSON_NOT_FOUND);
    const personIdx = persons.findIndex((person) => person.id === id);
    if (personIdx !== -1) {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      response.end(JSON.stringify(persons[personIdx]));
    } else {
      errorHandler(response, ERROR.PERSON_NOT_FOUND);
    }
  }
}

module.exports = new MethodGet();
