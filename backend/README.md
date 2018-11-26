# Empamini Express API server
This repo contains a demo API server written in Express that is meant for demo purposes only. All data is dummy data.

## Installation

```npm install```


## Execution

```npm start```

API server will be available at `http://localhost:3000`

## Available Enpoints

`GET /info`: Will return version and timestamp of the server.

`POST /login`: Will return the `id` of the user.

`GET /users/:id`: Will return the information of the user with the given `id`

`GET /users/:id/orders`: Will return the list of orders for the user with the given `id`

`DELETE /orders/:id`: Will cancel the order with the given `id`
