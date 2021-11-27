const { persons } = require('../data');
const { ERROR } = require('../const');
const errorHandler = require('./errorHandler')

class MethodDelete {
  deletePerson(response, id) {
    const personIdx = persons.findIndex((person) => person.id === id);
    if (personIdx !== -1) {
      persons.splice(personIdx, 1);
      response.statusCode = 204;
      response.end();
    } else {
      errorHandler(response, ERROR.PERSON_NOT_FOUND);
    }
  }
}

module.exports = new MethodDelete();
