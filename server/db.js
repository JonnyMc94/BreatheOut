const Pool = require("pg").Pool;

const pool = new Pool({
  user: "johnnymcnamee",
  password: "fuj2168",
  host: "localhost",
  port: 5432,
  database: "breatheout"
});

module.exports = pool;