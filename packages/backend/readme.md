# Backend

## Requirements

* Docker
* NodeJs

## Instructions

### Importer

This process will import the information in the db

1. Reset DB to avoid re-importing `yarn db:reset`
2. Ensure that the files are in the `data` folder
3. Run importer `yarn dev:start:importer`

### API

After importing the data, you can start the API, using `yarn dev:start:api`

#### Endpoints

* Get user trackings by email `GET http://localhost:8000/v1/trackings?email=email@email.com`
* Get tracking by ID `GET http://localhost:8000/v1/trackings/{id}`


## Test

* Unit test `yarn test:unit`
* E2E test `yarn test:e2e`

# What could be improved?

* Add more index to the db to improve performance on look up
* Add internal checkpoint status, I don't know well the domain so I decided to keep it simple
* Use abstract factory for repositories
* Add request validations with JOI
* Add authentication
* Use swagger
