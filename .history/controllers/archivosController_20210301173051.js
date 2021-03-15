const multer = require('multer');
const shortid = require('shortid');

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
     
}