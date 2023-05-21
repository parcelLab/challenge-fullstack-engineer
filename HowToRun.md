# How To Run The Quest

## Prerequisites

Requires Node 18+ and Docker to be installed.

## Server

To set everything up, cd into `quest-server/` and run:

```
yarn
yarn db:dev:init
yarn start
```

## Client

To set everything up, cd into `quest-client/` and run

```
yarn
yarn dev
```

## Testing

Time was short so I chose to mainly do E2E tests.

## Server E2E tests

to run E2E server tests, cd into `quest-server` and run:

```
yarn test:e2e
```

this will set up a testing database with the same schema as development to run tests against.

## Client E2E test

to run E2E client tests, cd into `quest-client` and run

```
yarn test
```

Make sure your server is running as these tests will need to access it.