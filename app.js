/* Modules */
// const { log } = require("console");
const express = require("express"); // 익스프레스 모듈 불러오기
const path = require("path"); // router에서 사용하고 있음
const pool = require("./js/inquirydb");
const fs = require("fs");

const app = express();

/* Use (미들웨어를 등록하는 메서드) */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve CSS, JS, image files

// Contact screen
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "html", "contact.html"));
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
    console.log(err ? "Error!" : "Success!"); // rows[0] 일때 undefined
  });
  res.redirect("/contact");
});

// Inquiry screen
app.get("/contact", (req, res) => {
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

    // res.send(updatedHtml)
    fs.readFile("./html/inquiry.html", "utf8", (error, data) => {
      if (error) console.log("Error");
      const updateText = data.slice(0, 693) + divList + data.slice(693);
      console.log(updateText);
      res.send(updateText);
    });
  });
});

module.exports = app;
