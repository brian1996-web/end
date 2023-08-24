const express = require("express");

// const dashboard =require("../models/signupModel")

const router = express.Router();

const { ensureLoggedIn } = require("connect-ensure-login");



router.get("/dashboard", ensureLoggedIn("/api/loginPage"), (req, res) => {
  res.render("manager_.pug");
})



module.exports = router;