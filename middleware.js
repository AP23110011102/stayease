const Listing=require("./models/listings");
const Review = require("./models/reviews");
const ExpressError=require("./utils/ExpressError.js");
const {listingschema,reviewschema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to create new listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id)){
        req.flash("error","You are not owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
//schema validation middlewares
module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
};

module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewschema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review=await Review.findById(reviewid);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","You are not owner of this Review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};