# File Storage UI Client with React

[![Build Status](https://travis-ci.org/javierseixas/file-storage-ui-client.svg?branch=master)](https://travis-ci.org/javierseixas/file-storage-ui-client)

## Run for development with docker

Make sure your ports `3000` and `8080` are available.

```
docker-compose up
```

## Run tests

```
npm run test
```

## Run standalone

Make sure you have port `3000` available.

```
npm start
```

## Tech-debt
* Create an store.js for App State
* Improving flash message
* Add client validation
* Improve test coverage
* Recover status text from Response
* Fix bug: form state doesn't change after first successfully upload


## Product-debt
* The app should at least trigger a `get` Request for retrieving a list of the files available in the server, and show them in another pane.