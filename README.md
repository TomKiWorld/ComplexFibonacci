# Complex Fibonacci Project

This project is set up to practice Docker with multiple Services.
The functionality could have been handeld by much less setup, the sole reason is for the purpose of this practice.

The [api](./api/README.md) server takes care of the api end points for values, indexes and the post action to add indexes to the database.

The [client](./client/README.md) contains the rect app for the frontend.

The [nginx](./nginx/README.md) takes care of routing for the api and the client servers.

The [worker](./worker/README.md) contains the functionality behind the calculator and setup of redis keys.

## Available scripts

### `docker-compose up --build`
To build all containers and launch the app.
