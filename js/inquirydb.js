const { Pool } = require("pg");
const text = "SELECT * FROM user_info";

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


pool.query(text, (err, res) => {
  if (err) console.log("err", err);
  console.log(res.rows[0]);
  // client.end;
});

module.exports = pool;

// < npm pg >
// https://www.npmjs.com/package/postgres
