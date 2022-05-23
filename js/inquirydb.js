const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "4606",
  database: "postgres",
});

client.connect();

client.query(`Select * from user_info`, (req, res, error) => {
  if (!error) {
    console.log(req);
  } else {
    console.log("No");
  }
  client.end;
});

// < npm pg >
// https://www.npmjs.com/package/postgres
