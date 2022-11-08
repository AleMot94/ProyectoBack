const express = require("express");
const { controladorGetIndex } = require("../controllers/controladorWebIndex");

const routerWeb = express.Router();

routerWeb.get("/", controladorGetIndex);

exports.routerWeb = routerWeb;
