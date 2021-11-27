const errorHandler = require('./utils/errorHandler')
const { METHOD } = require('./const');
const GET = require('./utils/MethodGet');
const POST = require('./utils/MethodPost');
const PUT = require('./utils/MethodPut');
const PATCH = require('./utils/MethodPatch');
const DELETE = require('./utils/MethodDelete');
const validatePersonId = require('./utils/validatePersonId');
const { ERROR } = require('./const');


function router(request, response) {
  const pathName = request.url;
  const path = pathName.slice(1).split('/');
  const person = 0;
  const personId = 1;
  const pathLength = 2;

  switch (request.method) {
    case METHOD.GET:
      if (path[person] === '' && path.length === person) {
        response.setHeader("Content-Type", "text/html; charset=utf-8;");
        response.write("<h1>SIMPLE-CRUD-API</h1>");
        response.end(`\nServer has been started... `);
      } else if ((path[person] === 'person' && path.length === 1) || (path.length === pathLength && path[personId] === '')) {
        GET.getPersons(response);
      } else if (path[person] === 'person' && path.length === pathLength) {
        validatePersonId(path[personId]) ? GET.getPersonById(response, path[personId]) : errorHandler(response, ERROR.PERSON_ID_NOT_VALID);
      } else {
        errorHandler(response, ERROR.ENDPOINT_NOT_EXIST);
      }
      break;
    case METHOD.POST:
      if ((path[person] === 'person' && path.length === 1) || (path.length === pathLength && path[personId] === '')) {
        POST.createPerson(request, response);
      } else {
        errorHandler(response, ERROR.ENDPOINT_NOT_EXIST);
      }
      break;
    case METHOD.PUT:
      if (path[person] === 'person' && path.length === pathLength) {
        validatePersonId(path[personId]) ? PUT.replacePerson(request, response, path[personId]) : errorHandler(response, ERROR.PERSON_ID_NOT_VALID);
      } else {
        errorHandler(response, ERROR.ENDPOINT_NOT_EXIST);
      }
      break;
    case METHOD.PATCH:
      if (path[person] === 'person' && path.length === pathLength) {
        validatePersonId(path[personId]) ? PATCH.updatePerson(request, response, path[personId]) : errorHandler(response, ERROR.PERSON_ID_NOT_VALID);
      } else {
        errorHandler(response, ERROR.ENDPOINT_NOT_EXIST);
      }
      break;
    case METHOD.DELETE:
      if (path[person] === 'person' && path.length === pathLength) {
        validatePersonId(path[personId]) ? DELETE.deletePerson(response, path[personId]) : errorHandler(response, ERROR.PERSON_ID_NOT_VALID);
      } else {
        errorHandler(response, ERROR.ENDPOINT_NOT_EXIST);
      }
      break;
    default:
      errorHandler(response, ERROR.UNKNOWN);
      break;
  }
}

module.exports = router;
