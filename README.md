# registraPresionArterial

MongoDB based REST API  and a simple SPA based on NodeJS + AngularJS  for blood pressure and heart rate registration.

### Usage

Open your terminal and launch the program as follows:

```sh
$ npm start
```

Then open your browser and type the following URL:

* http://localhost:3000

### API

| URL                                      | HTTP Verb     | POST Body   | Result                    |
| ---------------------------------------- | ------------- | ----------- | ------------------------- |
| http://localhost:3000/api/presiones      | GET           | empty       | Returns all entries       |
| http://localhost:3000/api/presiones      | POST          | JSON String | New entry created         |
| http://localhost:3000/api/presiones/:id  | GET           | empty       | Reteurns single entry     |
| http://localhost:3000/api/presiones/:id  | PUT           | JSON String | Updates an existing entry |
| http://localhost:3000/api/presiones/:id  | DELETE        | empty       | Deletes existing entry    |
