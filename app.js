if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const helmet=require("helmet");
const express=require('express');
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/users.js");


const listingrouter=require("./routes/listing.js");
const Reviewrouter=require("./routes/review.js");
const userrouter=require("./routes/user.js");

// ✅ Force HTTPS first
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// ✅ Security headers
app.use(helmet());

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));


app.listen("8080",()=>{
    console.log("Server is listening to port 8080");
});

//const MONGODB='mongodb://127.0.0.1:27017/Wanderlust'
//const dburl=process.env.ATLASDB_URL;
// main().then(()=>{
//     console.log("working succesfully");
// }).catch((err)=>{
//     console.log(err);
// });
//mongodb atlas connection(online datbase)
const dburl = process.env.ATLASDB_URL;
async function main() {
  try {
    await mongoose.connect(dburl, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected successfully");

  } catch (err) {
    console.error("MongoDB connection error:", err.reason || err);
  }
}

main();

const store=MongoStore.create({
    mongoUrl:dburl,
    // crypto:{
    //     secret:"mysupersecretcode",
    // },
    touchAfter:24*3600,
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};
// app.get("/",(req,res)=>{
//     res.send("Hi,I am robot");
// });

app.use(session(sessionOptions));//we have to use flash before routes
app.use(flash());
//autentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
});
// make current path available in all views
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/menu", (req, res) => {
  res.render("menu/menu", { curruser: req.user }); 
});
//router of listings,reviews
app.use("/listings",listingrouter);
app.use("/listings/:id/reviews",Reviewrouter);
app.use("/",userrouter);

//middleware for unmatched routes
app.use((req, res, next) => {
    throw new ExpressError(404,"Page Not Found!");
});
//error handling middleware
app.use((err,req,res,next)=>{
    let {statuscode=500,message="something went wrong"}=err;
    console.log("Something went wrong!")
    res.status(statuscode).render("Error.ejs",{message})
});
// app.get("/testlisting",async(req,res)=>{
//     let samplelisting=new listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     });
//     await samplelisting.save();
//     console.log("sample saved");
//     res.send("successful testing");
// });