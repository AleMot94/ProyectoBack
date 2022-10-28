//Ejemplo crear servidor con REQUIRE ya no se usa.
// se ejecuta con nodemon
//nodemon lee los cambios que se producen

const http = require("http");

//function controlador(peticion, respuesta) {
//  console.log(peticion);
//  respuesta.end("todo piola");
//}

//const server = http.createServer(8080,controlador);

const server = http.createServer((peticion, respuesta) => {
  console.log(peticion);
  respuesta.end("todo piola");
});
// si ponemos 0 en vez de 8080, elige un puerto al azar.
server.listen(8080, (error, resultado) => {
  if (error) console.log("algo fallo" + error);
  else console.log("conectado al puerto 8080");
});
