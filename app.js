/* Modules */
const express = require("express"); // 익스프레스 모듈 불러오기
const app = express();
const path = require("path") // router에서 사용하고 있음

/* Router */
const routers = require("./js/routers.js")


/* Use (미들웨어를 등록하는 메서드) */
app.use(express.static(__dirname)) // serve CSS, JS, image files
app.use("/", routers); //router



module.exports = app;
