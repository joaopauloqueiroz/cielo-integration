const Router = require('express').Router();
const Controller = require('./controler');

Router.post("/generate", Controller.store);
Router.post("/", Controller.get);

module.exports = Router;