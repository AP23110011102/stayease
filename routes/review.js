const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require('../models/reviews.js');
const listing=require("../models/listings.js");
const {isLoggedIn,validatereview,isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/reviews.js");

//reviews 
//post route

router.post("/",isLoggedIn,validatereview,wrapAsync(reviewcontroller.createReview));
//post delete route

router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.destroyReview));

module.exports=router;