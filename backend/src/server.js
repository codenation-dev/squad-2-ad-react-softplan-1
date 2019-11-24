//Importando o framework express
const express = require('express');
const mongoose = require('mongoose');

//Importando as rotas
const routes = require('./routes')

//Atribuindo o servidor a uma constante.
const server = express();

mongoose.connect('mongodb://fernando:fernando@central-de-erros-shard-00-00-ifyn2.mongodb.net:27017,central-de-erros-shard-00-01-ifyn2.mongodb.net:27017,central-de-erros-shard-00-02-ifyn2.mongodb.net:27017/test?replicaSet=central-de-erros-shard-0&ssl=true&authSource=admin', {
  useNewUrlParser: true
});


//Avisando ao servidor que os retornos serão JSON
server.use(express.json());

//Adicionando o plugin a aplicação
server.use(routes);

//Porta que o servidor vai ouvir
server.listen(3333);

