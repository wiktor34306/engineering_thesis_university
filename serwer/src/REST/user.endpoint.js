// import business from '../business/business.container';
// import applicationException from '../service/applicationException';
// import admin from '../middleware/admin';
// import auth from '../middleware/auth';

// const userEndpoint = (router) => {
//     router.post('/api/user/auth', async (request, response, next) => {
//         try {
//             let result = await business(request).getUserManager(request).authenticate(request.body.login, request.body.password);
//             response.status(200).send(result);
//         } catch (error) {
//             applicationException.errorHandler(error, response);
//         }
//     });

//     router.post('/api/user/create', auth, admin, async (request, response, next) => {
//         try {
//             let result = await business(request).getUserManager(request).createNewOrUpdate(request.body);
//             response.status(200).send(result);
//         } catch (error) {
//             applicationException.errorHandler(error, response);
//         }
//     });

//     router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
//         try {
//             let result = await business(request).getUserManager(request).removeHashSession(request.body.userId);
//             response.status(200).send(result);
//         } catch (error) {
//             applicationException.errorHandler(error, response);
//         }
//     });
// };

// export default userEndpoint;

const express = require("express");
const app = express();
import pool from "../../db";
import admin from '../middleware/admin';
import auth from "../middleware/auth";

const userEndpoint = (app) => {
  app.get("/get-users", auth(["administrator","superadministrator"]),  async (req, res) => {
    try {
      const users = await pool.query("SELECT * FROM akademia.uzytkownik;");
      res.json(users.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu użytkowników: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });

  app.get("/get-amount-of-users", auth(["administrator","superadministrator"]), async (req, res) => {
    try {
      const users = await pool.query("SELECT COUNT(*) FROM akademia.uzytkownik;");
      res.json(users.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu użytkowników: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });

};



export default userEndpoint;
