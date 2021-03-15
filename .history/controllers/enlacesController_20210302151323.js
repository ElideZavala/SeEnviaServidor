const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {
     
     // Revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()) { // Si errores no esta vacio
          return res.status(400).json({errores: errores.array()});
     }

     // Crear un objeto de Enlace
     const { nombre_original, password } = req.body;

     const enlace = new Enlaces();
     enlace.url = shortid.generate();
     enlace.nombre = shortid.generate();
     enlace.nombre_original = nombre_original;

     // Si el usuario esta autenticado
     if (req.usuario) {
          const { password, descargas } = req.body;

          // Asignar a enlace el número de descargas 
          if(descargas) {
               enlace.descargas = descargas;
          }

          // Asignar un password
          if(password) {
               const salt = await bcrypt.genSalt(10);
               enlace.password = await bcrypt.hash( password, salt );
          }

          // Asignar el autor 
          enlace.autor = req.usuario.id;
     }


     //Almacenar en la BD
     try {
          await enlace.save();
          return res.json({ msg : `${enlace.url}` });
          next();
     } catch (error) {
          console.log(error)
     }
}

//   Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {

     // console.log(req.params.url); // Cuando se manda por la url se utiliza .params
     const { url } =  req.params;

     // Verifica si existe el enlace         
     const enlace = await Enlaces.findOne({url});

     if(!enlace) {
          res.status(404).json({msg: 'Ese Enlace no existe'});
          return next();
     }

     // Si el enlace existe
     res.json({archivo: enlace.nombre});  // Te envia haia en archivo donde se encuentra tu enlace

     // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
     const { descargas, nombre } = enlace;

     if(descargas === 1) {
          console.log('Si solo 1')

          // Eliminar el archivo 
          req.archivo = nombre;

          // Eliminar la entrada de la base de datos

          next();
     } else {
          // Si las descargas son > a 1 - Restar 1 
          enlace.descargas--;    // Codigo para ir restando uno a uno 10/9/8/7 
          await enlace.save();
     }

      
}