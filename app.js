/* Modules */
const { log } = require("console");
const express = require("express"); // 익스프레스 모듈 불러오기
const path = require("path"); // router에서 사용하고 있음
const pool = require("./js/inquirydb");

const app = express();

/* Use (미들웨어를 등록하는 메서드) */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname)); // serve CSS, JS, image files

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "html", "contact.html"));
});
app.get("/inquiry", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "inquiry.html"));
});

app.post("/", (req, res, next) => {
  const userName = req.body.name;
  const userPhoneNum = req.body.phoneNum;
  const userMail = req.body.email;
  const userInquiry = req.body.inquiry;
  const query =  {
    text: 'INSERT INTO user_info(user_name,user_Phone_num,user_mail,user_inquiry) VALUES ($1,$2,$3,$4)',
    values: [userName, userPhoneNum,userMail,userInquiry],
  }

  pool.query(query,(err, res) => {
    if (err) {
      console.log("Error",err.stack)
    } else {
      console.log("okay", res.rows[0]) // undefinend?? rows[0]일 경우 undefined
    }
  })
  console.log("body",req.body);
});

/* pool.query("SELECT * FROM user_info",(err,res) => {
  if(err) {
    console.log("Error");
  } else {
    console.log(res.rows);
  }
}) */

module.exports = app;