const Pool = require("pg").Pool;

const pool = new Pool({
  user: <USERNAME>,
  password: <PASSWORD>,
  host: "localhost",
  port: <PORT>,
  database: "breatheout"
});

module.exports = pool;
