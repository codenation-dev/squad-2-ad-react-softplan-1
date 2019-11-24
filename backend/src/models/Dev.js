const { Schema, model } = require('mongoose');

//Criando o tipo de registro em banco de dados
const DevSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  bio: String,
  avatar: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});


module.exports = model('Dev', DevSchema);