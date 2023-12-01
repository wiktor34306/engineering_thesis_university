const express = require("express");
const app = express();
import pool from "../../db";
import auth from "../middleware/auth";

const academicDepartmentEndpoint = (app) => {

  app.get("/get-academic-departments",auth(["administrator","superadministrator","promotor","student"]), async (req, res) => {
    try {
      const academicDepartments = await pool.query("SELECT * from akademia.katedra ORDER BY nazwa;");
      res.json(academicDepartments.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu katedr: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });
  
  app.post("/academic-department-registration",auth(["administrator","superadministrator"]), async (req, res) => {
    const { nazwaKatedry, idWydzialu } = req.body;
  
    try {
      const existingDepartment = await pool.query(
        "SELECT id_katedry FROM akademia.katedra WHERE nazwa = $1 AND id_wydzialu = $2",
        [nazwaKatedry, idWydzialu]
      );
  
      if (existingDepartment.rows.length > 0) {
        return res.status(400).json({
          error: "Katedra o podanej nazwie już istnieje na tym wydziale.",
        });
      }
  
      const departmentRegister = await pool.query(
        "INSERT INTO akademia.katedra (nazwa, id_wydzialu) VALUES ($1, $2) RETURNING id_katedry",
        [nazwaKatedry, idWydzialu]
      );
  
      console.log("Dodano nową katedrę do bazy danych:", nazwaKatedry);
  
      res.status(201).json({ message: "Katedra zarejestrowana pomyślnie." });
    } catch (error) {
      console.error("Błąd przy rejestrowaniu katedry: ", error);
      res.status(500).json({
        error: "Błąd rejestracji katedry. " + error.message,
      });
    }
  });
  
      
  
};

export default academicDepartmentEndpoint;
