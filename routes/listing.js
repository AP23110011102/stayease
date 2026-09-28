const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listings.js");
const {listingschema,reviewschema}=require("../schema.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");
const listingcontroller=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

//index route and create route
router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isLoggedIn,upload.single('listing[image]'),validatelisting,wrapAsync(listingcontroller.createlisting));

//new route
router.get("/new",isLoggedIn,listingcontroller.renderform);

//update route,show route and delte route
router.route("/:id")
.patch(isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting,wrapAsync(listingcontroller.updatelisting))
.get(wrapAsync(listingcontroller.showlisting))
.delete(isLoggedIn,isOwner,wrapAsync(listingcontroller.destroylisting));


//update route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontroller.renderEditform));


module.exports=router;
