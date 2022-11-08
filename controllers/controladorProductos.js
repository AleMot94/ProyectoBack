const { randomUUID } = require("crypto");

const productos = [];

function controladorPostProductos(req, res) {
  const cosaNueva = req.body;
  cosaNueva.id = randomUUID();
  productos.push(cosaNueva);
  res.status(201);
  res.json(cosaNueva);
}

function controladorGetProductos(req, res) {
  res.status(201);
  res.json(productos);
}

module.exports.controladorPostProductos = controladorPostProductos;
module.exports.controladorGetProductos = controladorGetProductos;
