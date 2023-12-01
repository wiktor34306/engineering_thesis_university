const express = require("express");
const app = express();
import pool from "../../db";
import auth from "../middleware/auth";

const topicEndpoint = (app) => {
  app.post("/adding-topic", auth(["administrator","promotor", "superadministrator"]), async (req, res) => {
    const { id_promotora, id_katedry, temat, status, id_uzytkownika_dodajacego } = req.body;

    try {
      const existingPromotor = await pool.query(
        "SELECT * FROM akademia.promotor WHERE id_promotora = $1",
        [id_promotora]
      );

      if (existingPromotor.rows.length === 0) {
        return res.status(400).json({ error: "Podany identyfikator promotora nie istnieje." });
      }

      const existingKatedra = await pool.query(
        "SELECT * FROM akademia.katedra WHERE id_katedry = $1",
        [id_katedry]
      );

      if (existingKatedra.rows.length === 0) {
        return res.status(400).json({ error: "Podany identyfikator katedry nie istnieje." });
      }

      const existingUser = await pool.query(
        "SELECT * FROM akademia.uzytkownik WHERE id_uzytkownika = $1",
        [id_uzytkownika_dodajacego]
      );

      if (existingUser.rows.length === 0) {
        return res.status(400).json({ error: "Podany identyfikator użytkownika nie istnieje." });
      }

      const addTopicQuery = `
        INSERT INTO akademia.temat (temat, id_promotora, id_katedry, status, id_uzytkownika_dodajacego)
        VALUES ($1, $2, $3, $4, $5) RETURNING id_tematu
      `;

      const addedTopic = await pool.query(addTopicQuery, [temat, id_promotora, id_katedry, status, id_uzytkownika_dodajacego]);

      console.log("Dodano nowy temat do bazy danych:", temat);

      res.status(201).json({ message: "Temat dodany pomyślnie.", id_tematu: addedTopic.rows[0].id_tematu });
    } catch (error) {
      console.error("Błąd przy dodawaniu tematu: ", error);
      res.status(500).json({ error: "Błąd dodawania tematu." });
    }
  });

  app.get("/get-topics",auth(["administrator","promotor", "superadministrator","student"]), async (req, res) => {
    try {
      const topics = await pool.query(`
      SELECT
        t.id_tematu,
        t.temat,
        t.status,
        p.stopien_naukowy,
        u.imie,
        u.nazwisko,
        k.nazwa AS nazwa_katedry
      FROM
        akademia.temat AS t
      INNER JOIN
        akademia.promotor AS p ON t.id_promotora = p.id_promotora
      INNER JOIN
        akademia.uzytkownik AS u ON p.id_uzytkownika = u.id_uzytkownika
      INNER JOIN
        akademia.katedra AS k ON t.id_katedry = k.id_katedry;
      `);
      res.json(topics.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu tematów prac: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });

  app.get("/get-amount-of-topics",auth(["administrator","promotor", "superadministrator"]), async (req, res) => {
    try {
      const amountTopics = await pool.query("SELECT COUNT(*) FROM akademia.temat;");
      res.json(amountTopics.rows);
    } catch (error) {
      console.error("Błąd przy pobieraniu ilości tematów: ", error);
      res.status(500).json({ error: "Błąd pobierania danych" });
    }
  });
};

export default topicEndpoint;