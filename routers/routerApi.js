const express = require("express");
const {
  controladorPostProductos,
  controladorGetProductos,
  controladorGetById,
  controladorPutById,
  controladorDeleteById,
} = require("../controllers/controladorProductos");

const routerApi = express.Router();

routerApi.post("/", controladorPostProductos);
routerApi.get("/", controladorGetProductos);
routerApi.get("/:id", controladorGetById);
routerApi.put("/:id", controladorPutById);
routerApi.delete("/:id", controladorDeleteById);

exports.routerApi = routerApi;
