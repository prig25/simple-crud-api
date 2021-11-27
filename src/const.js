const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

const ERROR = {
  PERSON_ID_NOT_VALID: 'PERSON_ID_NOT_VALID',
  NOT_FOUND: 'NOT_FOUND',
  PERSON_NOT_FOUND: 'PERSON_NOT_FOUND',
  ENDPOINT_NOT_EXIST: 'ENDPOINT_NOT_EXIST',
  REQUIRED_FIELDS: 'REQUIRED_FIELDS',
  UNKNOWN: 'UNKNOWN'
}

module.exports = {
  METHOD,
  ERROR
};
