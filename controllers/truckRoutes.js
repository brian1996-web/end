const express = require('express');

const Truck = require('../models/truckModel');

const passport = require('passport');

const router = express.Router();

// const userModel = require('../models/userModel');

// when auser access the signup ('/signup', acallback function(req,res) replies
// back by giving user.pug)

router.get('/landingpage', (req, res) => {
  res.render('landingPage.pug');
});



router.get('/truckform', (req, res) => {
res.render('truck.pug');
});

router.post('/regtruck', async (req, res) => {
  try {
  const truck = new Truck(req.body);
  console.log(req.body);
  await truck.save(req.body.password);
  res.redirect("/api/truckform");
  } 
  catch (error) {
res.status(400).send({message: "failed to register user"})  
  
  console.log(error);}
});


router.get("/list", async (req, res) => {
  try {
     let items = await Truck.find();
     let ages = await Truck.aggregate([
      {"$group": {_id: "$all",
      totalAge: {$sum: "$age"},}}
     ]).count
   
    res.render("trucklist.pug", { trucks: items});
    // res.render("trucklist.pug", {trucks:items});
    // res.render("trucklist.pug", { trucks: items, empAges: ages[0].totalAge});
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Sorry could not get truck Numbers" });
  }
});
//    how to update data
router.get("/truck/edit/:id", async (req, res) => {
  try {
    
    const trk = await Truck.findOne({
      _id: req.params.id,
    });
    res.render("edittruck",{truck: trk});
     
  } 
  catch (error) {
    res.status(400).send("Couldn't find it in the  database");
    console.log(error);
  }
});

router.get("/truck/delete/:id", async (req, res)=>{
  try {
   res.render("edittruck");
  }
  catch (error){
    res.status(400).send("Couldn't find it in the  database");
    console.log(error);
  }
});
// //deleting 
router.post("/truck/delete", async (req, res) => {
  try {
    await Truck.deleteOne({ _id: req.body.id });
    res.redirect("/back");
  } catch (error) {
    res.status(400).send("Unable to delete item from the database");
  }
});

//route for newly eduted data
// router.post("/employee/edit" , ensureloggedIn("/api/login"), async (req, res) => {
  router.post("/truck/edit" , async (req, res) => {
try{
  
    await Truck.findOneAndUpdate({_id: req.query.id},req.body);
    res.redirect("/api/list")
   
  }
  catch(error){
    res.status(400).send("Could not find truck data");
    console.log(error);
  }
});













// login routes
// router.get("/login", (req, res) => {
// res.render("login.pug") 
// })

// router.post("/login", passport.authenticate("local",
// { failureRedirect: "/api/login"}), 
// (req, res) => {
//   req.session.user = req.user
//   let loggedinUser = req.session.user.firstname;
//   console.log(loggedinUser);
//   // res.render("dashboard");
//   // res.redirect("/api/dashboard")
//   console.log(req.body);
//   console.log(req.session.user.role);

//   if(req.session.user.role === "parking") {
//     res.render("parking_.pug");
//   } 
//  else if(req.session.user.role === "tire") {
//     res.render("tire_.pug",{inUser:loggedinUser});
//   } 
//   else if(req.session.user.role === "battery") {
//     res.render("battery_.pug");
//   }
//   else{
//     res.send("could not route user")
//   }
// }
// );
// // for logging out
// router.get("/logout", (req, res) => {
//   req.session.destroy(()=>{res.redirect("/api/login")});
//   console.log("you have been loged out")
// })






module.exports = router;