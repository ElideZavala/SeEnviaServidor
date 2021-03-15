const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Un Schema va a tener el esquema que va a tener los datos
const usuariosSchema = new Schema({
     email: {
          type: String,
          required: true, // Obligatorio como true.
          unique: true,
          lowercase: true, //Guarda todo lo que estas pasando en minusculas.
          trim: true //Elimina los espacios en blanco
     }, 
     nombre: {
          type: String,
          required: true,
          trim: true
     },
     password: {
          type: String,
          required: true,
          trim: true
     }
});

module.exports = mongoose.model('Usuarios', usuariosSchema); // El nombre delo modelo se llamara usuario. 