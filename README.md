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

## Solution explanations
* React has being used as UI framework
* Material UI has being implemented for design
* React app created from `create-react-app`
* CI: Every commit to master will trigger a travis-ci pipeline which will:
  * build and test the application
  * create a docker image and push it to Docker Hub


## Tech-debt
* Create an store.js for App State
* Improving flash message
* Add client validation
* Improve test coverage
* Recover status text from Response
* Fix bug: form state doesn't change after first successfully upload


## Product-debt
* The app should at least trigger a `get` Request for retrieving a list of the files available in the server, and show them in another pane.