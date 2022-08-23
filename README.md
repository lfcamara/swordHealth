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
#### - Authentication
`/auth/login` - Users should be authenticated to use the application

`/auth/logout` - To login another user, the previous user should logout

