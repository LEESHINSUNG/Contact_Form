const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "4606",
  database: "nodedb",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = pool;

// < npm pg >
// https://www.npmjs.com/package/postgres
