// ======== Importing npm packages ========

require("dotenv").config();

const express = require("express");
const { engine } = require("express-handlebars");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const passport = require("passport");
// const flash = require("express-flash"); // this is a package that will allow you to render short flash messages on your login screens: wrong password, existing username etc.
const session = require("express-session");

const app = express();
port = 5001;

// ========== In-built Node Modules ================
const fs = require("fs");
const path = require("path");
const https = require("https");

// =========== Local Modules ===================
const JobRouter = require("./Routers/JobRouter");
const AuthRouter = require("./Routers/AuthRouter");
const JobService = require("./Service/JobService");
// import passportconfig and isLogged in function here

// ========= Set up Express Handlebars ==============
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    layoutsDir: "",
    defaultLayout: "",
    extname: "hbs",
    // partialsDir: `${__dirname}/views/partials`,
  })
);

// ========= Set up Express  ================
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// =========== Set up Passport ============
// commented this out for now, so we can implement our  once ready
// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// =========== Set up JobService ============
const jobService = new JobService(knex);

// =========== Homepage set up ============
// can add isLoggedin function in here when implementing authentications
app.get(
  "/",
  /*isloggedin, */ (req, res) => {
    // console.log(`current user: `);
    res.render("home", {
      layout: "main",
      //   applicant: applicant,
      //   company: company,
    });
  }
);

app.get("/login",(req,res)=>{
  res.render("login",{
    layout:"main"
  })
})

app.get("/signup",(req,res)=>{
  res.render("signup",{
    layout:"main"
  })
})

app.get("/impactFinderPreview",(req,res)=>{
  res.render("impactFinderPreview",{
    layout:"main"
  })
})

app.get("/impactFinderProfile",(req,res)=>{
  res.render("impactFinderProfile",{
    layout:"main"
  })
})

app.get("/jobBoard",(req,res)=>{
  res.render("jobBoard",{
    layout:"main"
  })
})


// ========= Set up Routers ================

// Routers not active yet, awaiting implementation
// app.use("/", new AuthRouter(express, passport).router());
// app.use("/api/jobs", new JobRouter(jobService, express).router());

// const options = {
//   cert: fs.readFileSync("./localhost-align.crt"),
//   key: fs.readFileSync("./localhost-align.key"),
// };

// ============ Activate Server ===============

app.listen("5001",()=>{})
// https
//   .createServer(options, app)
//   .listen(port, () => console.log("listening on port: " + port));

module.exports = app;
