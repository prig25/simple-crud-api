# simple-crud-api

1. First step:

```
$ npm i
```

2. Second step - run server. App has 2 mode: 

**Development:**
```
$ npm run start:dev
```

**Production:**
```
$ npm run start:prod
```

3. You can change `PORT` in `.env` file. `PORT=3000` is default.

4. You can send `CRUD` requests. You can use `Postman` or same apps.
    - **GET======================================================================**
    
    ```
    http://localhost:3000/person/
    ```

    The server will reply with a default person:
    ```
    [
      {
        "id": "be83f2c2-e867-4315-a05e-915855f2a520",
        "name": "Jon",
        "age": 23,
        "hobbies": [
          "tennis"
        ]
      }
    ]
    ```

    If you send request with person id, the server will send the user with the given id. If there is no such user or the id is incorrect, the server will send an error:

    **Correct:**
    ```
    http://localhost:3000/person/be83f2c2-e867-4315-a05e-915855f2a520
    ```

    **No valid id:**
    ```
    http://localhost:3000/person/be83dsavdsvds0
    ```

    ```
    {
      "message": "Person id not valid..."
    }
    ```

    **Not match by person:**

    ```
    http://localhost:3000/person/be83f2c2-e867-4315-a05e-915855f2a521
    ```

    ```
    {
      "message": "Person not found..."
    }
    ```

    - **POST=====================================================================**

    ```
    http://localhost:3000/person/
    ```

    You must send an object with required fields to the body:

    ```
    {
      "name": "Name",
      "age": 20,
      "hobbies": ["hobbies"]
    }
    ```

    The server will reply with the added object. The server generates id on its own:

    ```
    {
      "id": "39eac00a-0d6d-43dd-9e77-122ffa1e6a14",
      "name": "Name",
      "age": 20,
      "hobbies": ["hobbies"]
    }
    ```

    If the required fields are incorrect or are missing, the server will send an error `400`:

    ```
    {
      "message": "The request body does not contain required fields..."
    }
    ```

    - **PUT======================================================================**

    ```
    http://localhost:3000/person/{personId}
    ```

    You must enter a valid id, and fill in the required fields in the body:

    ```
    {
      "name": "Name",
      "age": 20,
      "hobbies": ["hobbies"]
    }
    ```

    The server will reply with the added object:

    ```
    {
      "id": {personId}
      "name": "Name",
      "age": 20,
      "hobbies": ["hobbies"]
    }
    ```

    If the required fields are incorrect or are missing, the server will send an error `400`:

    ```
    {
      "message": "The request body does not contain required fields..."
    }
    ```

    - **PATCH====================================================================**

    ```
    http://localhost:3000/person/{personId}
    ```

    You must enter a valid id, and fill in any fields in the body. In the object, only the fields you specified will change, the rest will remain unchanged:

    ```
    {
      "age": 30
    }
    ```

    Result:

    ```
    {
      "id": {personId}
      "name": "Name",
      "age": 30,
      "hobbies": ["hobbies"]
    }
    ```

    - **DELETE===================================================================**

    ```
    http://localhost:3000/person/{personId}
    ```

    You must enter only a valid id. The server will reply with the code `204`.


5. If an unexpected error occurs in the application, or the data in the body is incorrectly written, the server will send an error with a code of `500`:

```
{
    "message": "Error with code 500..."
}
```

6. For tests running with coverage you can use:

```
$ npm test
```