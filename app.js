const express = require("express"); // 익스프레스 모듈 불러오기
const path = require("path");

const app = express(); // app 생성
app.use(express.static(__dirname)) // serve CSS, JS, image files

const port = 8000;
// app.set("속성값","값")

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'html','contact.html'));
  // res.sendFile("html/contact.html", { root: __dirname });
});

app.get("/inquiry", (req, res) => {
  res.sendFile(path.join(__dirname,'html','inquiry.html'));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);