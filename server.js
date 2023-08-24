const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const passport = require("passport");

const Signupin = require("./models/userModel");


// connecting to our port
const connectDB = require("./configdb/dbConfig");
const port = process.env.PORT || 4000;

// calling the configuration to run
const app = express();

//importing the Routes
const loginPageRoutes = require("./controllers/loginPageRoutes");
const signupRoutes = require('./controllers/signupRoutes');
const formRoutes = require('./controllers/formRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const userRoutes = require('./controllers/userRoutes');
const sectionsRoutes = require('./controllers/sectionsRoutes');



const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false
})
// const session = expressSession({})
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// calling the configuration to run
connectDB();


//setting up pug as our view engine
app.engine("pug",require("pug").__express);
app.set("view engine", "pug");
app.set("views",path.join(__dirname,"views"));

// setting up directory for static files

app.use(expressSession);


app.use(passport.initialize());
app.use(passport.session());


passport.use(Signupin.createStrategy());
passport.serializeUser(Signupin.serializeUser());
passport.deserializeUser(Signupin.deserializeUser());

app.use(express.static(path.join(__dirname,'public')));

app.use('/api', signupRoutes);

app.use('/api', loginPageRoutes);

app.use('/api', formRoutes);

app.use('/api', dashboardRoutes);

app.use('/api', userRoutes);

app.use('/api', sectionsRoutes);






// app.get("/sections", (req, res) => {
//   res.send("sections.pug");
// });










// app.listen(port, () => console.log(" server is running at http://localhost:"+port));

app.listen(port, () => console.log(" server is running at http://localhost:"+port));
