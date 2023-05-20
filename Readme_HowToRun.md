# How To Run The Quest

## Prerequisites

Requires Node and Docker to be installed.

## Server

On the server, there is a NestJs instance connected to Postgres. Prisma is used as the ORM.

To setup the postgres database, seed the data and start the server, run the following:

```
yarn db:dev:init
yarn start
```

## Client

