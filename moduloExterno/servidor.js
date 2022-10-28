const express = require("express");

const servidor = express();

servidor.get("/index", (peticion, respuesta) => {
  respuesta.send("<h1>estas en el index</h1>");
});

servidor.get("/", (peticion, respuesta) => {
  respuesta.json("[{esto: esUnObjeto}]");
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
