const Review = require('../models/reviews.js');
const listing=require("../models/listings.js");

module.exports.createReview=async(req,res)=>{
    let Listing=await listing.findById(req.params.id);
    let newreview=new Review(req.body.review);
    newreview.author=req.user._id;
    Listing.reviews.push(newreview);
    await newreview.save();
    await Listing.save();
    req.flash("success","New review created!");
    res.redirect(`/listings/${Listing._id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
};