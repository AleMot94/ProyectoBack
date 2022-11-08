const express = require("express");
const app = express();
const { routerWeb } = require("./routers/routerWeb");
const { routerApi } = require("./routers/routerApi");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerWeb);
app.use("/api/productos", routerApi);

app.listen(8080, () => {
  console.log(`conectado al puerto 8080`);
});
