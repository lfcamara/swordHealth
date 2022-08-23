# swordHealth
Sword Health Tech Challenge

## Installation and execution
`docker-compose up`

This command will download the necessary images and create the containers:
- MySQL Database
- Adminer - Database interface (localhost:8080)
- Rabbitmq (localhost:15672)
- Application (localhost:3333)

## Routes
- #### Authentication
`POST /auth/login` - Users should be authenticated to use the application

`DELETE /auth/logout` - To login another user, the previous user should logout

There is a default user for the first login and from there, interact with the application:
`username: admin
passowrd: admin`

- ### Users
`POST /users` - Create a new user

`GET /users` - Get information from all registered users

`GET /users/:id` - Get information from a specific user

`PATCH /users/:id` - Update information from a specific user

`DELETE /users/:id` - Delete an user

*Tech Users cant affect or get information from another users. Manager User have all permissions.

- ### Tasks
`POST /tasks` - Create a new task for the logged in user

`GET /tasks` - Get tasks from the logged in user

`GET /tasks/all` - Get information from all registered tasks

`PATCH /tasks/:id` - Update information from a task

`DELETE /tasks/:id` - Delete a task

*Tech Users cant affect or get information from another users. Manager User have all permissions.

## Tests

`npm run test`

`npm run test:cov` - Get tests coverage

