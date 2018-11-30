# Empatica assignment

Project for the coding assignment.

## Getting Started

The project contains both the fake backend and the frontend. I pushed the backend because I needed to tweak it a bit in order to make it return appropriate CORS headers without whom I couldn't make requests from a frontend running on another port. I also slightly slowed down artificially some of the endpoints, to demonstrate how the loading spinner works.

### Backend

* Move to folder `backend`.
* Install the dependencies with `npm install`.
* Run the server with `npm start` if you are in the backend folder, or with `npm run start-backend` if you are in the project root. The server binds by default to port `3000`.

### Frontend

* Install the dependencies with `npm install`.
* Run the frontend server with `npm start`. The server binds by default to port `8000`.

## Build

The provided `gulpfile` contains the build configuration to generate a distributable version of the app. More details can be found directly within the build script.

To build the app ensure Gulp is installed globally and run `gulp build`. A `dist` folder will be generated with all the required files.

To run a frontend server that exposes the build app, use `npm run start-dist`. The server binds by default to port `8001`.

## Testing

There are two kinds of tests in the `angular-seed` application: Unit tests and end-to-end tests.

### Running Unit Tests

The `angular-seed` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have a `.spec.js` suffix (e.g.
  `view1.spec.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```

### End-to-End Tests

End-to-End tests can be found under `e2e-tests`.
If you previously ran `npm install`, all the required dependencies will be already available.
To start Protractor and run the full test suite:
* Ensure both the frontend and the backend servers are up and running.
* Run `npm run protractor`.

**Note:**
Under the hood, Protractor uses the [Selenium Standalone Server][selenium], which in turn requires
the [Java Development Kit (JDK)][jdk] to be installed on your local machine.

**Note:**
I have deliberately written some of the test cases assuming this is a demo frontend project backed by a dummy server. For example, orders get cancelled but never created, which would breaks tests idempotency if the orders were really deleted.