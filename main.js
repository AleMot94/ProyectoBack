const express = require("express");
const app = express();
const puerto = 8080;

const { routerWeb } = require("./routers/routerWeb");
const { routerApi } = require("./routers/routerApi");
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use("/", routerWeb);
app.use("/api/productos", routerApi);

const server = app.listen(puerto, () => {
  console.log(`conectado al puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
