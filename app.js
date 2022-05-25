/* Modules */
const { log } = require("console");
const express = require("express"); // 익스프레스 모듈 불러오기
const path = require("path"); // router에서 사용하고 있음
const pool = require("./js/inquirydb");

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

  pool.query(query, (err, res) => {
    console.log(err ? "Error!" : "Success!", res.rows[0]); // rows[0] 일때 undefined
  });
  console.log("body", req.body);
});

// pool.query("SELECT * FROM user_info",(err,res) => {
// console.log(err?"Error" : "Success",res.rows[1]);
// })

// Inquiry screen
app.get("/inquiry", (req, res) => {
  pool.query("SELECT * FROM user_info", (err, res) => {
    if (err) console.log("Error");

    let divList = []; // [``, ``, ``, ...] 文字列が入っている配列 -> string
    for (i = 0; i < res.rowCount; i++) {
      const item = res.rows[i];
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

    console.log(divList);

    // cosnt updatedHtml = inquiry.htmlを開いて、divlistを中に入れる。

    // res.send(updatedHtml)

    let text = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Us</title>
        <script src="../js/screenInquiry.js"></script>
        <link rel="stylesheet" href="../css/inquiryStyle.css" />
      </head>
      <body>
        <div class="inquiryScreen">
          <nav class="navi">
            <div class="naviDiv backScreen">
              <a href="/html/contact.html" class="clickContact">前に戻る</a>
            </div>
            <div class="naviDiv title">お問い合わせ</div>
            <div class="naviDiv blank"></div>
          </nav>
          <div class="inquiryBoxs">...</div>
        </div>
      </body>
    </html>
    <div>
    `;

    // let text += divList;
  });

  res.sendFile(path.join(__dirname, "html", "inquiry.html"));
});

module.exports = app;
