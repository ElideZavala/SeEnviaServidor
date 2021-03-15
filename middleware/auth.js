const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'})

module.exports = ( req, res, next ) => {
     const authHeader = req.get('Authorization');

     if (authHeader) {
          // Obtener el Token
          const token = authHeader.split(' ')[1]; // Separado por un espacio
          
          // Comprobar el JWT
          try {
               const usuario = jwt.verify(token, process.env.SECRETA); // Comprobar que el jwt enviado si es valido.
               req.usuario = usuario
          } catch (error) {
               console.log(error)
               console.log('JWT no valido');
          }
          
     } 

     return next(); // Le dice que nua vez ejecutado este middleware, se vaye hacia la otra para que no se quede estancada. 
}