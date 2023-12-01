// import jwt from 'jsonwebtoken';
// import config from '../config';

// const auth = (req, res, next) => {
//   let token = req.headers['x-access-token'] || req.headers['authorization'];
//   if (token.startsWith('Bearer ')) {
//     token = token.slice(7, token.length);
//   }
//   if (!token) return res.status(401).send('Access denied. No token provided.');

//   try {
//     req.user = jwt.verify(token, config.JwtSecret);
//     next();
//   }
//   catch (ex) {
//     res.status(400).send('Invalid token.');
//   }
// };

// export default auth;

// auth.js

import jwt from 'jsonwebtoken';
import config from '../config';
import TokenDAO from '../DAO/tokenDAO';
import { jwtDecode } from "jwt-decode";

const auth = (rola) => {
  
return async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log("Plik auth.js, token:",token, req.headers)
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      console.log("Token po usunięciu 'Bearer ': ", token);
    }
    if (!token) {
      console.log("Brak tokenu.");
      return res.status(401).send('Access denied. No token provided.');
    }
  
    try {
      const validate = jwt.verify(token, config.JwtSecret);
      console.log("Jesteś w pliku auth.js, wartość validate",validate);

      const decodedToken = jwtDecode(token);
      console.log("Decoded token: ", decodedToken);
      console.log("Rola użytkownika: ", decodedToken.rola);
      if (rola.includes(decodedToken.rola)){
        console.log("Rola jest prawidłowa.");
        next()
      } else {
        console.log("Nieprawidłowa rola. Nie masz uprawnień do tego zasobu");
        res.status(403).send('Forbidden. Incorrect role.');
      }
      console.log("Auth.js, decodedToken",decodedToken);

    } catch (ex) {
      console.log("Błąd podczas weryfikacji tokenu: ", ex.message);
      res.status(400).send(`Invalid token. Details:  ${ex.message}`);
    }
  };
} 
  
export default auth;