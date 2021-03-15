const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs'); // Nos permite eliminar o crear nuevos archivos
const Enlaces = require('../models/Enlace');

exports.subirArchivo = async (req, res, next) => {

     const configuracionMulter = {
          limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 }, 
          storage: fileStorage = multer.diskStorage({    // Se guardaran en el servidor
               destination: (req, file, cb) => {         // Se coloca donde se van a guardar los archivos.
                    cb(null, __dirname+'/../uploads')    // Sera el error
               },
               filename: (req, file, cb) => {   // Hacer mas corta la extension. 
                    const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length); 
                    cb(null, `${shortid.generate()}${extension}`);
               }
          })
     }
     
     const upload = multer(configuracionMulter).single('archivo');

     upload( req, res, async (error) => {+
          console.log(req.file);

          if(!error) {
               res.json({archivo: req.file.filename });  // Le vamos a decir al usuario cual es el nombre del archivo
          } else { 
               console.log(error);
               return next();
          }

     })
}

exports.eliminarArchivo = async (req, res) => {
    // console.log(req.archivo);

     try {     
          fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`)
          console.log('Archivo Eliminado')
     } catch (error) {
          console.log(error);
     }
}

// Descarga un archivo
exports.descargar = async (req, res, next) => {

     // Obtiene el enlace
     const { archivo } = req.params;
     const enlace = await Enlaces.findOne({ nombre: archivo });

     // Colocamos la direccion exacta del archivo
     const archivoDescarga = __dirname + '/../uploads/' + archivo;
     res.download(archivoDescarga);

     // Eliminar el archivo y la entrada de la BD 
     // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
     const { descargas, nombre } = enlace;

     if(descargas === 1) {
          console.log('Si solo 1')

          // Eliminar el archivo 
          req.archivo = nombre;

          // Eliminar la entrada de la base de datos
          await Enlaces.findOneAndRemove(enlace.id)

          next();
     } else {
          // Si las descargas son > a 1 - Restar 1 
          enlace.descargas--;    // Codigo para ir restando uno a uno 10/9/8/7 
          await enlace.save();
     }
}