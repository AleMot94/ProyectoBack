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

function controladorGetById(req, res) {
  const id = req.params.id;
  const elemBuscado = productos.find((e) => e.id === id);
  if (!elemBuscado) {
    res.status(404);
    res.json({ error: `producto no encontrado id: ${id}` });
  } else {
    res.json(elemBuscado);
  }
}

function controladorPutById(req, res) {
  const id = req.params.id;
  const indexElem = productos.findIndex((e) => e.id === id);
  if (indexElem === -1) {
    res.status(404);
    res.json({ error: `producto no encontrado id: ${id}` });
  } else {
    productos[indexElem] = req.body;
    res.json(req.body);
  }
}

function controladorDeleteById(req, res) {
  const id = req.params.id;
  const indexElem = productos.findIndex((e) => e.id === id);
  if (indexElem === -1) {
    res.status(404);
    res.json({ error: `producto no encontrado id: ${id}` });
  } else {
    const productoBorrado = productos.splice(indexElem, 1);
    res.json(productoBorrado);
  }
}

module.exports.controladorPostProductos = controladorPostProductos;
module.exports.controladorGetProductos = controladorGetProductos;
module.exports.controladorGetById = controladorGetById;
module.exports.controladorPutById = controladorPutById;
module.exports.controladorDeleteById = controladorDeleteById;
