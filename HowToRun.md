# How To Run The Quest

## Prerequisites

Requires Git, Node 18+ and Docker to be installed.

## Clone the Repo

the quest-server is actually a submodule or git. To make sure everything works, run this command to clone:
```
git clone --recurse-submodules git@github.com:RussellSnyder/challenge-fullstack-engineer.git
```

this should set up two sub folders `quest-client` and `quest-server`.

## Server

cd into `quest-server` for the following steps:

### .env files

To make things easier (and safer) there need to be two environment files: .env and .env.test. These are not committed to the codebase, but there is a `.env.sample` and a `.env.test.sample` that you can use as a starting point. You can either manually remove the `.sample` suffix or run the following to automatically create useable environment files:

```
yarn env:usesample
```

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

The app will then be accessible at `http://localhost:5174/` - check it out!

## Testing

Time was short so I chose to focus mainly do E2E tests.

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

Make sure your server is running as these tests will need to access it. These tests use pupeteer to go through the application flow and ensure functionality.