const express = require("express");
const app = express();
import pool from "../../db";
import auth from "../middleware/auth";

const subjectEndpoint = (app) => {

  app.get("/get-subjects", auth(["administrator","superadministrator", "promotor", "student"]), async (req, res) => {
    try {
      const subjects = await pool.query("SELECT * from akademia.kierunek_studiow;");
      res.json(subjects.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu katedr: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });
  
  app.post("/subject-registration", auth(["administrator","superadministrator"]), async (req, res) => {
    const { nazwaKierunku, idWydzialu, idKatedry } = req.body;
  
    try {
      // Sprawdź, czy istnieje już kierunek studiów o podanej nazwie na tym wydziale i w tej katedrze.
      const existingSubject = await pool.query(
        "SELECT id_kierunku FROM akademia.kierunek_studiow WHERE nazwa = $1 AND id_wydzialu = $2 AND id_katedry = $3",
        [nazwaKierunku, idWydzialu, idKatedry]
      );
  
      if (existingSubject.rows.length > 0) {
        return res.status(400).json({
          error: "Kierunek studiów o podanej nazwie już istnieje na tym wydziale i w tej katedrze.",
        });
      }
  
      // Dodaj nowy kierunek studiów do bazy danych.
      const subjectRegister = await pool.query(
        "INSERT INTO akademia.kierunek_studiow (nazwa, id_wydzialu, id_katedry) VALUES ($1, $2, $3) RETURNING id_kierunku",
        [nazwaKierunku, idWydzialu, idKatedry]
      );
  
      console.log("Dodano nowy kierunek studiów do bazy danych:", nazwaKierunku);
  
      res.status(201).json({ message: "Kierunek studiów zarejestrowany pomyślnie." });
    } catch (error) {
      console.error("Błąd przy rejestrowaniu kierunku studiów: ", error);
      res.status(500).json({
        error: "Błąd rejestracji kierunku studiów. " + error.message,
      });
    }
  });
  
  
      
  
};

export default subjectEndpoint;
