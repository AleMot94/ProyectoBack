const express = require("express");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const puerto = 8080;

const { routerWeb } = require("./routers/routerWeb");
const { routerApi } = require("./routers/routerApi");
//const { engine } = require("express-handlebars");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.engine("handlebars", engine());
//app.set("view engine", "handlebars");
const mensajes = [];
const productos = [];

//app.use("/", routerWeb);
//app.use("/api/productos", routerApi);

const server = httpServer.listen(puerto, () => {
  console.log(`conectado al puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

io.on("connection", (socket) => {
  console.log("Usuario conectado: " + socket.id);
  // PRODUCTOS
  socket.emit("productos", productos);
  socket.on("actualizacionProductos", (producto) => {
    productos.push(producto);
    io.sockets.emit("productos", producto);
  });

  // CHAT
  socket.emit("mensajesActualizados", mensajes);
  socket.on("eventoMensaje", (mensaje) => {
    mensaje.fecha = new Date().toLocaleString();
    mensajes.push(mensaje);
    io.sockets.emit("mensajesActualizados", mensajes);
  });
});
