const express = require("express");
const app = express();
import pool from "../../db";
import auth from "../middleware/auth";

const departmentEndpoint = (app) => {

  app.get("/get-departments", auth(["administrator","superadministrator"]), async (req, res) => {
    try {
      const departments = await pool.query("SELECT * FROM akademia.wydzial ORDER BY nazwa;");
      res.json(departments.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu wydziałów: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });

  
  app.post("/department-registration", auth(["administrator","superadministrator"]), async (req, res) => {
    const { nazwa } = req.body;
  
    try {
      const existingDepartment = await pool.query(
        "SELECT id_wydzialu FROM akademia.wydzial WHERE nazwa = $1",
        [nazwa]
      );
  
      if (existingDepartment.rows.length > 0) {
        return res.status(400).json({
          error: "Wydział o podanej nazwie już istnieje.",
        });
      }
  
      const departmentRegister = await pool.query(
        "INSERT INTO akademia.wydzial (nazwa) VALUES ($1) RETURNING id_wydzialu",
        [nazwa]
      );
  
      console.log("Dodano nowy wydział do bazy danych:", nazwa);
  
      res.status(201).json({ message: "Wydział zarejestrowany pomyślnie." });
    } catch (error) {
      console.error("Błąd przy rejestrowaniu: ", error);
      res.status(500).json({
        error: "Błąd rejestracji. Sprawdź, czy dane się nie duplikują.",
      });
    }
  });
  
};

export default departmentEndpoint;
