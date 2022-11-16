const { randomUUID } = require("crypto");
const fs = require("fs");
const productos = [];
const ruta = "./productos.txt";

function controladorGetIndex(req, res) {
  res.render("formulario");
}

/*async function controladorGetProductos(req, res) {      // NO SE POR QUE NO FUNCIONA
  try {
    const file = await fs.promises.readFile(ruta, "utf-8");
    const fileParse = JSON.parse(file);
    res.render("productos", { fileParse, hayPropductos: fileParse.length > 0 });
  } catch (error) {
    console.log(error);
  }
}*/

function controladorGetProductos(req, res) {
  res.render("productos", { productos, hayPropductos: productos.length > 0 });
}

async function controladorPostProductos(req, res) {
  try {
    const producto = req.body;
    producto.id = randomUUID();
    productos.push(producto);
    await fs.promises.writeFile(ruta, JSON.stringify(productos));
    res.status(201);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

module.exports.controladorGetProductos = controladorGetProductos;
module.exports.controladorPostProductos = controladorPostProductos;
module.exports.controladorGetIndex = controladorGetIndex;
