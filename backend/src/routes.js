const express = require('express');
const DevController = require('./controllers/DevController');

const routes = express.Router();

//Requisição, POST, PUT, DELETE, GET
//Por padrão só enxerga o GET, demais fazer via Insomnia ou Postman ou um FORM.

routes.post('/devs', DevController.store);

module.exports = routes;