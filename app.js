/* Modules */
const express = require("express"); // 익스프레스 모듈 불러오기
const path = require("path"); // router에서 사용하고 있음

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
  console.log(req.body);
});

module.exports = app;
