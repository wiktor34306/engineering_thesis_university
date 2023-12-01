// import PasswordDAO from '../DAO/passwordDAO';
// import TokenDAO from '../DAO/tokenDAO';
// import UserDAO from '../DAO/userDAO';
// import applicationException from '../service/applicationException';
// import sha1 from 'sha1';

// function create(context) {

//   function hashString(password) {
//     return sha1(password);
//   }

//   async function authenticate(name, password) {
//     let userData;
//     const user = await UserDAO.getByEmailOrName(name);
//     if (!user) {
//       throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
//     }
//     userData = await user;
//     await PasswordDAO.authorize(user.id, hashString(password));
//     const token = await TokenDAO.create(userData);
//     return getToken(token);
//   }

//   function getToken(token) {
//     return {token: token.value};
//   }

//   async function createNewOrUpdate(userData) {
//     const user = await UserDAO.createNewOrUpdate(userData);
//     if (await userData.password) {
//       return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
//     } else {
//       return user;
//     }
//   }

//   async function removeHashSession(userId) {
//     return await TokenDAO.remove(userId);
//   }

//   return {
//     authenticate: authenticate,
//     createNewOrUpdate: createNewOrUpdate,
//     removeHashSession: removeHashSession
//   };
// }

// export default {
//   create: create
// };

// user.manager.js

// import bcrypt from 'bcrypt';
// import PasswordDAO from '../DAO/passwordDAO';
// import TokenDAO from '../DAO/tokenDAO';
// import UserDAO from '../DAO/userDAO';
// import applicationException from '../service/applicationException';

// function create(context) {

//   const saltRounds = 10;

//   async function hashPassword(password) {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
//   }

//   async function authenticate(name, password) {
//     try {
//       const user = await UserDAO.getByEmailOrName(name);

//       if (!user) {
//         throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);
      
//       if (!isPasswordValid) {
//         throw applicationException.new(applicationException.UNAUTHORIZED, 'Invalid password');
//       }

//       const token = await TokenDAO.create(user.id);
//       return getToken(token);
//     } catch (error) {
//       throw applicationException.new(applicationException.UNAUTHORIZED, 'Authentication failed');
//     }
//   }

//   function getToken(token) {
//     return { token: token.value };
//   }

//   async function createNewOrUpdate(userData) {
//     try {
//       const hashedPassword = await hashPassword(userData.password);
//       userData.password = hashedPassword;

//       const user = await UserDAO.createNewOrUpdate(userData);

//       // Dodano użycie PasswordDAO
//       await PasswordDAO.createOrUpdate({ userId: user.id, password: hashedPassword });

//       return user;
//     } catch (error) {
//       throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Error creating or updating user');
//     }
//   }

//   async function removeHashSession(userId) {
//     try {
//       await TokenDAO.remove(userId);
//     } catch (error) {
//       throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Error removing user session');
//     }
//   }

//   return {
//     authenticate: authenticate,
//     createNewOrUpdate: createNewOrUpdate,
//     removeHashSession: removeHashSession
//   };
// }

// export default {
//   create: create
// };


import UserDAO from '../DAO/userDAO';
import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import applicationException from '../service/applicationException';
import bcrypt from 'bcrypt';


function create(context) {
  async function authenticate(adres_email, haslo) {
    let userData;
    try {
      const user = await UserDAO.getUserByEmail(adres_email);
      console.log("Jesteś w user w 143 linijce w user.manager:", user);
      if (!user) {
        console.log("Jesteś w ifie");
        throw applicationException.new(applicationException.UNAUTHORIZED, 'Użytkownik z tym adresem e-mail nie istnieje');
      }
  
      userData = user;
      console.log("Plik user.manager, 149 linijka, wartość userData:", userData);
  
      // Dodaj te linie logów przed wywołaniem bcrypt.compare
      console.log("Przekazane hasło:", haslo);
      console.log("Hasło z bazy danych (userData.haslo):", userData.haslo);
  
      const isPasswordValid = await bcrypt.compare(haslo, userData.haslo);
      console.log("Plik user.manager, 150 linijka, wartość isPasswordValid:", isPasswordValid);
      if (!isPasswordValid) {
        throw applicationException.new(applicationException.UNAUTHORIZED, 'Nieprawidłowe hasło');
      }
  
      const token = await TokenDAO.createToken(userData);
      console.log(token);
      return token;
    } catch (error) {
      console.error('Jesteś w user.manager, 159 lin: authenticate - Error:', error);
      throw error;
    }
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);
    console.log("Jesteś w createNewOrUpdate",user);
    console.log("Jesteś przed ifem");
    if (userData.haslo) {
      console.log("Jesteś w ifie, userData.haslo",userData.haslo)
      await PasswordDAO.createOrUpdate({ id_uzytkownika: user.id_uzytkownika, haslo: userData.haslo });
    }

    return user;
  }

  async function removeHashSession(id_uzytkownika) {
    return await TokenDAO.remove(id_uzytkownika);
  }

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession
  };
}

export const userManager = create();