const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

router.post('/',
     [    
          // Revizar que el nombre no este vaacio
          check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
          check('email', 'Agrega un Email valido').isEmail(),
          check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6})
     ],
     usuarioController.nuevoUsuario 
);

module.exports = router;