const express = require("express");
const servidor = express();
const fs = require("fs");

class Contenedor {
  constructor(ruta) {
    this.producto = [];
    this.ruta = ruta;
  }

  async saveProducto(title, price, url) {
    const objeto = {
      id: null,
      title: title,
      price: price,
      thumbnail: url,
    };

    try {
      if (this.producto.length == 0) {
        objeto.id = 0;
        this.producto.push(objeto);
      } else {
        objeto.id = this.producto[this.producto.length - 1].id + 1;
        this.producto.push(objeto);
      }
      await fs.promises.writeFile(this.ruta, JSON.stringify(this.producto));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const file = await fs.promises.readFile(this.ruta, "utf-8");
      const fileParse = JSON.parse(file);
      while (fileParse.length > 0) {
        const elemBuscado = fileParse.find((elem) => elem.id == id);
        return elemBuscado;
      }
    } catch (error) {
      console.log(`no se encontro el producto error:${error}`);
    }
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(file);
    } catch (error) {
      throw new error(`no se encontro el archivo error:${error}`);
    }
  }

  async deleteById(id) {
    try {
      const file = await fs.promises.readFile(this.ruta, "utf-8");
      const fileParse = JSON.parse(file);
      if (fileParse.find((elem) => elem.id == id)) {
        fileParse.splice(id, 1);
        await fs.promises.writeFile(this.ruta, JSON.stringify(fileParse));
      }
    } catch (error) {
      console.log(`no se pudo borrar el producto:${error}`);
    }
  }

  async deleteAll() {
    try {
      const newArray = [];
      await fs.promises.writeFile(this.ruta, JSON.stringify(newArray));
    } catch (error) {
      console.log(error);
    }
  }

  async randomElem() {
    try {
      const file = await fs.promises.readFile(this.ruta, "utf-8");
      const fileParse = JSON.parse(file);
      const indexRandom = Math.floor(Math.random() * fileParse.length);
      console.log(indexRandom);
      return fileParse[indexRandom];
    } catch (error) {
      throw new error(error);
    }
  }
}

const productos = new Contenedor("./productos.txt");

ejecutar = async () => {
  await productos.saveProducto(
    "samsung galaxy a52s",
    125000,
    "https://images.samsung.com/is/image/samsung/p6pim/pe/feature/152984171/pe-feature---499941806?$FB_TYPE_A_MO_JPG$"
  );
  await productos.saveProducto(
    "motorola g9 plus",
    140000,
    "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/09/hipertextual-motorola-lanza-mexico-moto-e7-plus-moto-g9-play-y-moto-g9-plus-2020767596.jpg?fit=1500%2C1000&quality=50&strip=all&ssl=1"
  );
  await productos.saveProducto(
    "apple iphone 11",
    230000,
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-11-pro-midnight-green-2019_GEO_EMEA?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1611101519000"
  );
};

ejecutar();

servidor.get("/", (peticion, respuesta) => {
  respuesta.send("hola!!!");
});

servidor.get("/productos", async (peticion, respuesta) => {
  respuesta.send(await productos.getAll());
});

servidor.get("/productorandom", async (peticion, respuesta) => {
  respuesta.json(await productos.randomElem());
});

function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const conectarServer = servidor.listen(puerto, () => {
      resolve(conectarServer);
    });
    conectarServer.on("error", (error) => reject(error));
  });
}

module.exports = { conectar };
