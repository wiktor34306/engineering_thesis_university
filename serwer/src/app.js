// const express = require("express");
// const app = express();
// const cors = require("cors");
// import config from "./config";
// import bodyParser from "body-parser";
// const pool = require("./db");

// //middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: "2048kb" }));


// //ROUTES

// app.listen(config.port, () => {
//     console.log(`server has started on port ${config.port}`);
// });

// // // test
// app.get('/student', async (req, res) => {
//     try {
//       const query = 'SELECT * FROM akademia.student';
//       const { rows } = await pool.query(query);
//       res.send(rows);
//       console.log("Student okay");

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

// import bodyParser from 'body-parser';
// const pool = require('pg');
// import config from './config';
// import cors from 'cors';
// import express from 'express';
// import morgan from 'morgan';
// import routes from './REST/routes';

// const app = express();
// app.use(express.static(__dirname + '/public'));

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json({limit: '2048kb'}));
// app.use(express.json());
// app.use(cors());

// process.on('SIGINT', () => {
//     pool.end() // Zamyka połączenie z bazą danych PostgreSQL
//       .then(() => {
//         console.error('PostgreSQL connection closed through app termination');
//         process.exit(0);
//       })
//       .catch((err) => {
//         console.error('Error closing PostgreSQL connection:', err);
//         process.exit(1);
//       });
//   });

// routes(app);

// app.get('/*', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.listen(config.port, function () {
//   console.info(`Server is running at ${config.port}`)
// });

import config from "./config";
const express = require("express");
const pool = require("../db");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
import routes from "./REST/routes";

app.use(cors({
  origin: '*',
}));

app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "2048kb"}));

app.use(express.static('public'));

app.get("/", (req, res) => {
  console.log("Start");
  res.send("Hello, server has started")
});

routes(app);

app.get("/*", function (req,res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})