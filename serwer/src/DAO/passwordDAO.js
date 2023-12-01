// import mongoose from 'mongoose';
// import * as _ from 'lodash';
// import applicationException from '../service/applicationException';
// import mongoConverter from '../service/mongoConverter';


// const passwordSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
//   password: { type: String, required: true }
// }, {
//   collection: 'password'
// });

// const PasswordModel = mongoose.model('password', passwordSchema);

// async function createOrUpdate(data) {
//   const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, _.omit(data, 'id'), { new: true });
//   if (!result) {
//     const result = await new PasswordModel({ userId: data.userId, password: data.password }).save();
//     if (result) {
//       return mongoConverter(result);
//     }
//   }
//   return result;
// }

// async function authorize(userId, password) {
//   const result = await PasswordModel.findOne({ userId: userId, password: password });
//   if (result && mongoConverter(result)) {
//     return true;
//   }
//   throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
// }

// export default {
//   createOrUpdate: createOrUpdate,
//   authorize: authorize,

//   model: PasswordModel
// };

const pool = require("../../db")
const bcrypt = require('bcrypt');


// Tworzenie nowego hasła
async function createPassword(userInfo, hashedPassword) {
  try {
    // Dodaj użytkownika
    const addUserQuery = 'INSERT INTO akademia.uzytkownik (imie, nazwisko, adres_email, rola, aktywny) VALUES ($1, $2, $3, $4, $5) RETURNING id_uzytkownika';
    const addUserValues = [userInfo.imie, userInfo.nazwisko, userInfo.adres_email, userInfo.rola, userInfo.aktywny];
    const userResult = await pool.query(addUserQuery, addUserValues);

    // Pobierz identyfikator użytkownika
    const userId = userResult.rows[0].id_uzytkownika;

    // Dodaj hasło z odwołaniem do użytkownika
    const addPasswordQuery = 'INSERT INTO akademia.haslo (id_uzytkownika, haslo) VALUES ($1, $2) RETURNING *';
    const addPasswordValues = [userId, hashedPassword];
    const passwordResult = await pool.query(addPasswordQuery, addPasswordValues);

    // Zwróć wynik
    return { user: userResult.rows[0], password: passwordResult.rows[0] };
  } catch (error) {
    // Obsłuż błędy
    console.error('Error creating user and password:', error);
    throw error;
  }
}

// Autoryzacja użytkownika na podstawie hasła
async function authorize(userId, hashedPassword) {
  const query = 'SELECT id_hasla FROM akademia.haslo WHERE id_uzytkownika = $1 AND haslo = $2';
  const values = [userId, hashedPassword];
  const result = await pool.query(query, values);
  
  if (result.rows.length > 0) {
    // Użytkownik autoryzowany
    return true;
  }
  
  // Użytkownik nieautoryzowany
  return false;
}

// // Aktualizacja hasła użytkownika
// async function updatePassword(userId, hashedPassword) {
//   const query = 'UPDATE gradebook.users SET password = $1 WHERE user_id = $2';
//   const values = [hashedPassword, userId];
//   await pool.query(query, values);
// }

//Weryfikacja
async function verifyPassword(userId, providedPassword) {
  const query = 'SELECT haslo FROM akademia.haslo WHERE id_uzytkownika = $1';
  const values = [userId];
  const result = await pool.query(query, values);

  if (result.rows.length > 0) {
    const storedHashedPassword = result.rows[0].haslo;
    // Porównaj hasła za pomocą bcrypt.compare
    console.log("passwordDAO, providedPassword:",providedPassword);
    console.log("passwordDAO, storeHashedPassword:",storedHashedPassword);
    const isPasswordValid = await bcrypt.compare(providedPassword, storedHashedPassword);
    return isPasswordValid;
  }

  return false;
}


module.exports = {
  createPassword,
  authorize,
  // updatePassword,
  verifyPassword,
};
