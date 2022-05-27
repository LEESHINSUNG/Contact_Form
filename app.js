/* Modules */
const express = require("express");
const path = require("path");
const pool = require("./postgredb");
const fs = require("fs");
// const engine = require("templating-engine");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(engine);

const PORT = 8000;

// お問い合わせフォーム
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/", (req, res, next) => {
  const userName = req.body.name,
    userPhoneNum = req.body.phoneNum,
    userMail = req.body.email,
    userInquiry = req.body.inquiry;
  const query = {
    text: "INSERT INTO user_info(user_name,user_phone_num,user_mail,user_inquiry) VALUES ($1,$2,$3,$4)",
    values: [userName, userPhoneNum, userMail, userInquiry],
  };

  pool.query(query, (err, result) => {
    console.log(err ? "Error!" : "Success!");
    res.redirect("/contacts");
  });
});

// お問い合わせ一覧
app.get("/contacts", (req, res) => {
  const text = `
  SELECT * FROM user_info 
  ORDER BY data_time DESC;
  `;
  pool.query(text, (err, result) => {
    if (err) console.log("Error");

    let divList = []; // [``, ``, ``, ...] 文字列が入っている配列 -> string
    for (i = 0; i < result.rowCount; i++) {
      const item = result.rows[i];
      const div = `
      <div class="inquiryBox">
        <div class="userName">${item.user_name}</div>
        <div class="userPhoneNum">${item.user_phone_num}</div>
        <div class="userMail">${item.user_mail}</div>
        <div class="userInquiry">${item.user_inquiry}</div>
      </div>
      `;
      divList.push(div);
    }
    divList = divList.join(" "); // 文字列

    fs.readFile("./public/contact.html", "utf8", (error, data) => {
      if (error) console.log("Error");
      const updateText = data.slice(0, 631) + divList + data.slice(631);
      res.send(updateText);
    });
  });
});

module.exports = app;

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
