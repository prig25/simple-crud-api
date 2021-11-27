const fetch = require('cross-fetch');

const { persons } = require('../data');

const startServer = require('../utils/startServer');

startServer();

const urlBase = 'http://localhost:3000/';
const urlPerson = 'http://localhost:3000/person';
const urlPersonNotExist = 'http://localhost:3000/person/dsgdsg/dsgsgds/dsgdsgd';
const urlPersonId = 'http://localhost:3000/person/be83f2c2-e867-4315-a05e-915855f2a520';
const urlPersonIdNotValid = 'http://localhost:3000/person/915855f2a520';
const urlPersonIdNotFound = 'http://localhost:3000/person/be83f2c2-e867-4315-a05e-915855f2a521';
const errorNotValid = {
  message: "Person id not valid..."
};
const errorNotFound = {
  message: "Person not found..."
};
const errorRequiredFields = {
  message: "The request body does not contain required fields..."
};
const errorPathNotExist = {
  message: "Resource that you requested doesn't exist..."
};
const errorUnknown = {
  message: "Error with code 500..."
};

const startMessage = '<h1>SIMPLE-CRUD-API</h1>\nServer has been started...';

const personReplaced = {
  id: "be83f2c2-e867-4315-a05e-915855f2a520",
  name: "Andrew",
  age: 27,
  hobbies: ["JS"]
}

const personUpdated = {
  id: "be83f2c2-e867-4315-a05e-915855f2a520",
  name: "Andrew",
  age: 22,
  hobbies: ["JS"]
}

describe('GET methods testing:', () => {
  test('Should get person object', async () => {
    const response = await fetch(urlPerson);
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(persons);
  });

  test('Should get person object by id', async () => {
    const response = await fetch(urlPersonId);
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(persons[0]);
  });

  test('Should get error: person id not valid', async () => {
    const response = await fetch(urlPersonIdNotValid);
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotValid);
  });
});

describe('POST methods testing:', () => {
  test('Should get new one person object', async () => {
    const response = await fetch(urlPerson, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Allen",
        age: 25,
        hobbies: ["football"]
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(persons[1]);
  });

  test('Should get error: body does not contain required fields', async () => {
    const response = await fetch(urlPerson, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Allen",
        age: 25
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorRequiredFields);
  });

  test('Should get status code 201', async () => {
    const response = await fetch(urlPerson, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "William",
        age: 24,
        hobbies: ["song"]
      })
    });
    const status = await response.status;
    expect(status).toEqual(201);
  });
});

describe('PUT methods testing:', () => {
  test('Should get replaced person object', async () => {
    const response = await fetch(urlPersonId, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Andrew",
        age: 27,
        hobbies: ["JS"]
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(personReplaced);
  });

  test('Should get error: person id not valid', async () => {
    const response = await fetch(urlPersonIdNotValid, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Andrew",
        age: 27,
        hobbies: ["JS"]
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotValid);
  });

  test('Should get error: person not found', async () => {
    const response = await fetch(urlPersonIdNotFound, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Andrew",
        age: 27,
        hobbies: ["JS"]
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotFound);
  });

  test('Should get error: required fields', async () => {
    const response = await fetch(urlPersonId, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Andrew",
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorRequiredFields);
  });
});

describe('PATCH methods testing:', () => {
  test('Should get updated person object', async () => {
    const response = await fetch(urlPersonId, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: 22,
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(personUpdated);
  });

  test('Should get error: person id not valid', async () => {
    const response = await fetch(urlPersonIdNotValid, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: 22,
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotValid);
  });

  test('Should get error: person not found', async () => {
    const response = await fetch(urlPersonIdNotFound, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: 22
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotFound);
  });
});

describe('DELETE methods testing:', () => {
  test('Should delete person and get nothing', async () => {
    const response = await fetch(urlPersonId, {
      method: "DELETE"
    });
    const text = await response.text();
    expect(text).toEqual('');
  });

  test('Should delete person and return status code 204', async () => {
    const responseGet = await fetch(urlPerson);
    const text = await responseGet.text();
    const json = JSON.parse(text);
    const personId = json[0].id;
    const responseDelete = await fetch(`${urlPerson}/${personId}`, {
      method: "DELETE"
    });
    const status = await responseDelete.status;
    expect(status).toEqual(204);
  });

  test('Should get error: person not found', async () => {
    const response = await fetch(urlPersonId, {
      method: "DELETE"
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotFound);
  });

  test('Should get error: person id not valid', async () => {
    const response = await fetch(urlPersonIdNotValid, {
      method: "DELETE"
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotValid);
  });
});

describe('ErrorHandler testing:', () => {
  test('Should get error: person not found', async () => {
    const response = await fetch(urlPersonIdNotFound);
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorNotFound);
  });

  test('Should get error: Resource that you requested does not exist...', async () => {
    const response = await fetch(urlPersonNotExist);
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorPathNotExist);
  });

  test('Should get error: Error with code 500...', async () => {
    const response = await fetch(urlPerson, {
      method: "COPY"
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorUnknown);
  });
});

describe('Routing testing:', () => {
  test('Should get HTML and start message', async () => {
    const response = await fetch(urlBase);
    const text = await response.text();
    expect(text).toEqual(startMessage);
  });

  test('Should get error: Resource that you requested does not exist', async () => {
    const response = await fetch(urlPersonNotExist, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Allen",
        age: 25,
        hobbies: ["football"]
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorPathNotExist);
  });

  test('Should get error: Resource that you requested does not exist', async () => {
    const response = await fetch(urlPersonNotExist, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Andrew",
        age: 27,
        hobbies: ["JS"]
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorPathNotExist);
  });

  test('Should get error: Resource that you requested does not exist', async () => {
    const response = await fetch(urlPersonNotExist, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: 22,
      })
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorPathNotExist);
  });

  test('Should get error: Resource that you requested does not exist', async () => {
    const response = await fetch(urlPersonNotExist, {
      method: "DELETE"
    });
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json).toEqual(errorPathNotExist);
  });
});