const express = require("express");
const {
  controladorPostProductos,
  controladorGetProductos,
} = require("../controllers/controladorProductos");

const routerApi = express.Router();

routerApi.post("/", controladorPostProductos);
routerApi.get("/", controladorGetProductos);

exports.routerApi = routerApi;
