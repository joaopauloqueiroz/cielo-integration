const Router = require('express').Router();
const Controller = require('./controler');

Router.post("/generate", Controller.store);
Router.get("/", Controller.get);

module.exports = Router;