var express = require("express");

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTION, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var users = {
  1: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com"
  }
};

var orders = {
  1: {
    id: 1,
    ref: "#ord-2018-a993bee3",
    status: "paid",
    tracking: {
      carrier: "UPS",
      trackingCode: "DAJA91930102NDAKKS0",
      status: "in_transit"
    },
    items: [
      {
        sku: "emb-mb-s",
        name: "Embrace Watch - Stretchable Band Black",
        amount: 249
      }
    ],
    discounts: [
      {
        name: "Christmas 2018 - 10% OFF",
        type: "percent",
        value: 10
      }
    ]
  },
  2: {
    id: 2,
    ref: "#ord-2018-b6012cc8",
    status: "paid",
    tracking: null,
    items: [
      {
        sku: "emb-bb-s",
        name: "Embrace Watch - Stretchable Band Blue",
        amount: 249
      },
      {
        sku: "emb-mb-s",
        name: "Embrace Watch - Stretchable Band Black",
        amount: 249
      }
    ],
    discounts: [
      {
        name: "2x1 Embrace",
        type: "amount",
        value: 249
      }
    ]
  }
};

var userOrders = { orders: [orders[1], orders[2]] };

app.get("/info", function(req, res) {
  res.json({
    version: "1.0.0",
    timestamp: new Date()
  });
});

app.post("/login", function(req, res) {
  res.json({
    id: 1
  });
});

app.get("/users/:id", function(req, res) {
  setTimeout(() => res.json(users[+req.params["id"]]), 2000);
  ;
});

app.get("/users/:id/orders", function(req, res) {
  setTimeout(() => res.json(userOrders), 3000);
});

app.delete("/orders/:id", function(req, res) {
  setTimeout(() => res.json({
      orderId: +req.params["id"],
      status: "cancelled",
      order: orders[+req.params["id"]]
  }), 2000);
});

console.log("Server is starting at localhost:3000");
app.listen(3000);
