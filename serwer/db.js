const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

module.exports = pool;