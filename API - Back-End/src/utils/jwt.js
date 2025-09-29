import jwt from 'jsonwebtoken';

const secret = "CriptographyKey";

function generateToken(payload) {
   return jwt.sign(payload, secret, {expiresIn: 60*60});
}

function authenticate(request, response, next) {
   const {authorization} = request.headers;

   if(!authorization) {
      return response.status(401).send({message: "Token não informado."});
   }

   const bearer = authorization.split(' ')[0];
   const token = authorization.split(' ')[1];

   if(bearer != "Bearer") {
      return response.status(401).send({message: "Token não possui 'Bearer'"});
   }

   jwt.verify(token, secret, (err, usuario) => {
      if (err) {
         if (err.name === "TokenExpiredError") {
            return response.status(401).send({message: "Sessão expirada. Realize login novamente."});
         }
         return response.status(401).send({message: "Acesso não autorizado. Token inválido"});
      }
      console.log("Token decodificado:", usuario);
      request.usuario = usuario;
      next();
   });
}

export {generateToken, authenticate};