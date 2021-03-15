const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enlacesSchema = new Schema({
     url: {
          type: String,
          required: true
     },
     nombre: {
          type: String,
          required: true
     },
     nombre_original: {
          type: String,
          required: true
     },
     descargas: {
          type: Number,
          default: 1 // si no hay numero de descargas por defecto sera 1. 
     },
     autor: {
          type: mongoose.Schema.Types.ObjectId,  // LLave foranea
          ref: 'Usuarios',
          default: null
     },
     password: {
          type: String,
          default: null
     },
     creado: {
          type: Date,
          default: Date.now()
     }

})
module.exports = mongoose.model('Enlaces', enlacesSchema); // El nombre del modelo se llamara enlace