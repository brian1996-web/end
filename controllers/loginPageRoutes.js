const express = require('express');

const router = express.Router();

const LoginPage = require("../models/loginPageModel")

const passport = require("passport");


//sign up route
router.get('/loginPage', (req, res) => {
  res.render('loginPage.pug');
});

router.post('/regloginPage', async (req, res) => {
  try {
    const loginPage = new LoginPage(req.body);
    await loginPage.save();
    res.redirect("/api/loginPage");
    console.log(req.body);
  }
     catch (error) {
    res.status(400).render("loginPage");
    console.log(error);
  }
});

router.post("/loginPage", passport.authenticate("local",
{ failureRedirect: "/api/loginPage"}), 
(req, res) => {
  req.session.user = req.user
  let loggedinUser = req.session.user.firstname;
  console.log(loggedinUser);
  // res.render("dashboard");
  // res.redirect("/api/dashboard")
  console.log(req.body);
  console.log(req.session.user.role);

  if(req.session.user.role === "director") {
    res.render("director_.pug");
  } 
 else if(req.session.user.role === "manager") {
    res.render("manager_.pug",{inUser:loggedinUser});
  } 
  else if(req.session.user.role === "Salesagent") {
    res.render("Salesagent_.pug");
  }
  else{
    res.send("could not route user")
  }
}
);
// // for logging out
// router.get("/logout",  (req, res) => {
//   req.session.destroy(()=>{res.redirect("/api/login")});
//   console.log("you have been loged out")
// })




module.exports = router;