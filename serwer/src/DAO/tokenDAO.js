// import mongoose from 'mongoose';
// import config from '../config';
// import momentWrapper from '../service/momentWrapper';
// import jwt from 'jsonwebtoken';
// import mongoConverter from '../service/mongoConverter';
// import applicationException from '../service/applicationException';

// const tokenTypeEnum = {
//   authorization: 'authorization'
// };

// const tokenTypes = [tokenTypeEnum.authorization];

// const tokenSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
//   createDate: { type: Number, required: true },
//   type: { type: String, enum: tokenTypes, required: true },
//   value: { type: String, required: true }
// }, {
//   collection: 'token'
// });

// const TokenModel = mongoose.model('token', tokenSchema);

// async function create(user) {
//   const access = 'auth';
//   const userData = {
//     userId: user.id,
//     name: user.email,
//     role: user.role,
//     isAdmin: user.isAdmin,
//     access: access
//   };
//   const value = jwt.sign(
//     userData,
//     config.JwtSecret,
//     {
//       expiresIn: '3h'
//     });
//   const result = await TokenModel({
//     userId: user.id,
//     type: 'authorization',
//     value: value,
//     createDate: momentWrapper.get().valueOf()
//   }).save();
//   if (result) {
//     return mongoConverter(result);
//   }
//   throw applicationException.new(applicationException.BAD_REQUEST, error.message);
// }

// async function get(tokenValue) {
//   const result = await TokenModel.findOne({ value: tokenValue });
//   if (result) {
//     return mongoConverter(result);
//   }
//   throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
// }

// async function remove(userId) {
//   return await TokenModel.deleteOne({ userId: userId });
// }

// export default {
//   create: create,
//   get: get,
//   remove: remove,

//   tokenTypeEnum: tokenTypeEnum,
//   model: TokenModel
// };

// const { Pool } = require('pg');
// const db = require('../../db'); // Importujesz swoje połączenie do bazy danych

// const Token = {
//   async create(userId, value, type) {
//     const now = new Date(); // Aktualny czas
//     const query = `
//       INSERT INTO akademia.token (id_uzytkownika, data_utworzenia, typ, wartosc)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *;
//     `;
    
//     const values = [userId, now, type, value];
    
//     try {
//       const { rows } = await db.query(query, values);
//       if (rows.length > 0) {
//         return rows[0];
//       } else {
//         throw new Error('Error creating token');
//       }
//     } catch (error) {
//       throw error;
//     }
//   },
  
//   async get(tokenValue) {
//     const query = 'SELECT * FROM akademia.token WHERE wartosc = $1;';
    
//     try {
//       const { rows } = await db.query(query, [tokenValue]);
//       if (rows.length > 0) {
//         return rows[0];
//       } else {
//         throw new Error('Token not found');
//       }
//     } catch (error) {
//       throw error;
//     }
//   },
  
//   async remove(userId) {
//     const query = 'DELETE FROM akademia.token WHERE id_uzytkownika = $1;';
    
//     try {
//       const result = await db.query(query, [userId]);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   },
  
//   async getUserRole(userId) {
//     const query = 'SELECT rola FROM akademia.uzytkownik WHERE id_uzytkownika = $1;';
    
//     try {
//       const { rows } = await db.query(query, [userId]);
//       if (rows.length > 0) {
//         return rows[0].rola;
//       } else {
//         throw new Error('User not found');
//       }
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = Token;


import jwt from 'jsonwebtoken';
import config from '../config';
const momentWrapper = require('../service/momentWrapper');
const applicationException = require('../service/applicationException');
const pool = require('../../db');

async function createToken(user) {
  if (!config.JwtSecret) {
    throw new Error('Secret key is missing');
  }

  console.log("CO przyjmuje zmienna User:",user)

  // Tworzenie obiektu payload bez hasła i adresu e-mail
  const payload = {
    id_uzytkownika: user.id_uzytkownika,
    rola: user.rola,
    imie: user.imie
    // możesz dodać więcej pól tutaj, jeśli chcesz
  };

  console.log("Wartość payload:", payload)
  const token = jwt.sign(payload, config.JwtSecret, { expiresIn: '1h' });
  const date = new Date();
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  const tokenRegister = await pool.query(
    `INSERT INTO akademia.token (id_uzytkownika, data_utworzenia, typ, wartosc) 
    VALUES ($1, $2, $3, $4) 
    `,
    [payload.id_uzytkownika, date.toISOString(),'authorization',token]
  );
  console.log("token: ", token);
  return token;
}

function verifyToken(token) {
  try {
    if (!config.JwtSecret) {
      throw new Error('Secret key is missing');
    }

    const payload = jwt.verify(token, config.JwtSecret);
    console.log("Token zdekodowany: ",payload);
    return payload;
  } catch (error) {
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Invalid token');
  }
}

function generateToken(user) {
  if (!config.JwtSecret) {
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Secret key is missing');
  }

  // Tworzenie obiektu payload bez hasła i adresu e-mail
  console.log("user w tokenDAO",user);
  const payload = {
    id: user.id,
    rola: user.rola,
    // możesz dodać więcej pól tutaj, jeśli chcesz
  };

  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: '1h' });
  return token;
}

async function remove(id_uzytkownika) {
  console.log("Jesteś w tokenDAO w funkcji remove")
  console.log("Id użytkownika:",id_uzytkownika);
  const removeToken = await pool.query(
    "DELETE FROM akademia.token WHERE id_uzytkownika = $1",
    [id_uzytkownika]
  );
}

module.exports = {
  createToken,
  verifyToken,
  generateToken,
  remove
};