const express = require("express");
const {
  controladorGetIndex,
  controladorPostProductos,
  controladorGetProductos,
} = require("../controllers/controladorWebIndex");

const routerWeb = express.Router();

routerWeb.get("/", controladorGetIndex);
routerWeb.get("/productos", controladorGetProductos);
routerWeb.post("/productos", controladorPostProductos);

exports.routerWeb = routerWeb;
