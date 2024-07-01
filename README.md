# Text file stats - API

This is an interview project backend repo for REST apis built with NodeJS and Express.

## Project information

It has a POST api that accepts "file" as form-data type.
It validates below points:

- only a single "file" allowed to upload
- max file size is a 2KB
- only text file allowed

API end-points:

1. File stats check: http://localhost:3000/api/v1/files/stats

## For Project Developers - Technical points to be reviewed

- It follow trunk based deployment strategy, "main" is a default branch.
- All developers should create a brach from "main" and need to keep in sync with it.
- This project follows routes -> controller -> service -> model design pattern.
- Responsibility at each layer:
  - Router: defines end-point routes for different entity - file, user, team etc.
  - Controller: does required validation - authentication check, input validation, etc. , calls business service, handle errors and returns response.
  - Service: Contains business logic.
  - Model: Handles data transactions - storing/fetching data from database.
- Have API versioning implemented. Currently only v1 version routes available.
- It does not have authentication and swagger documentation in place as of now.
- API end-point has allowed CORS for all domains for testing.

## How to start

- Make sure you've NodeJS and NPM installed in local machine.

### npm install

Run npm install at root directory.

### npm run start

Run npm start at root directory, it will start the server on port 3000.
Make sure you don't have other service running on that port before running this command.

### npm run test

Run npm run test at root directory, it will run Unit and Integration tests for the project.

### Integration test coverage

## http://localhost:3000/api/v1/files/stats

1. Calling API with out file
2. Calling API with valid text file
3. Calling API with JSON and JPEG file
4. Calling API with multiple files

## Next steps for development team

- Onboard to Swagger
- Add proper logger
- Cover proper unit and integration test cases.
