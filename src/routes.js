const Router = require('express').Router();
const Controller = require('./controler');

Router.post("/generate", Controller.store);

module.exports = Router;