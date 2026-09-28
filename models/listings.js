const mongoose=require("mongoose");
const Review = require("./reviews.js");
const User=require("./users.js");
const schema=mongoose.Schema;
const DEFAULT_IMAGE = "https://wallup.net/wp-content/uploads/2019/09/760104-apartment-condo-interior-design-house-building-architecture-swimming-pool-3.jpg";
const listingSchema=new schema({
     title:{
        type:String,
        required:true
     },
     description:String,
     image:{
        url:String,
        filename:String
     },
     price:Number,
     location:String,
     country:String,
     geometry: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
            required:true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required:true,
            default: [0, 0]
        }
    },
     reviews:[
         {
            type:schema.Types.ObjectId,
            ref:"Review"
         }
     ],
     owner:{
         type:schema.Types.ObjectId,
         ref:"User"
     }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
      await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
