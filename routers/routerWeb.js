const express = require("express");
const {
  controladorGetIndex,
  controladorPostProductos,
  controladorGetProductos,
} = require("../controllers/controladorWeb");

const routerWeb = express.Router();

// pagina index
routerWeb.get("/", controladorGetIndex);
// pagina productos
routerWeb.get("/productos", controladorGetProductos);
routerWeb.post("/productos", controladorPostProductos);
// pagina chat
routerWeb.get("/chat");

exports.routerWeb = routerWeb;
