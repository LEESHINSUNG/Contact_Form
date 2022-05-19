const express = require("express");
const router = express.Router();
const ctrl = require("./ctrl")

router.get("/", ctrl.screenContact);
router.get("/inquiry", ctrl.screenInquiry);

module.exports = router;