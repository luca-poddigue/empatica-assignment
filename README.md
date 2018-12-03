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

To build the app run `npm run build`. A `dist` folder will be generated with all the required files.

To run a frontend server that exposes the build app, use `npm run start-dist`. The server binds by default to port `8001`.

## Testing

### Unit tests

The unit tests are found next to the code they are testing and have a `.spec.js` suffix (e.g.
  `spinner.spec.js`).

If you previously ran `npm install`, all the required dependencies will be already available.

To start Karma and run the full test suite run `npm test`.

### End-to-End tests

End-to-End tests can be found under `e2e-tests`.
If you previously ran `npm install`, all the required dependencies will be already available.

To start Protractor and run the full test suite:
* Install the webdriver with `npm run update-webdriver`.
* Ensure both the frontend and the backend servers are up and running.
* Run `npm run protractor`.

**Note:**
Under the hood, Protractor uses the Selenium Standalone Server, which in turn requires
the Java JDK to be installed on your local machine.

**Note:**
I have deliberately written some of the test cases assuming this is a demo frontend project backed by a dummy server. For example, orders get cancelled but never created, which would breaks tests idempotency if the orders were really deleted.