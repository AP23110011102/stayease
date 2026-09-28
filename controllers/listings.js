const listing=require("../models/listings.js");

module.exports.index=async (req,res)=>{
    const allListings=await listing.find({});
    res.render("./listings/index.ejs",{allListings});
};

module.exports.renderform=(req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.createlisting = async (req, res) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;

        const newlisting = new listing(req.body.listing);
        newlisting.owner = req.user._id;
        newlisting.image = { url, filename };

        // 🌍 Forward Geocoding with OpenStreetMap (Nominatim)
        if (newlisting.location) {
            const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newlisting.location)}`
            );
            const geoData = await geoRes.json();
            if (geoData && geoData.length > 0) {
                newlisting.geometry = {
                    type: "Point",
                    coordinates: [
                        parseFloat(geoData[0].lon),
                        parseFloat(geoData[0].lat)
                    ]
                };
            }
        }

        await newlisting.save();
        req.flash("success", "New listing created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "Something went wrong while creating the listing!");
        res.redirect("/listings");
    }
};

module.exports.renderEditform=async(req,res)=>{
    let {id}=req.params;
    const delisting=await listing.findById(id);
    if(!delisting){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let orginalImageUrl=delisting.image.url;
    orginalImageUrl=orginalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{delisting,orginalImageUrl});
};

module.exports.updatelisting=async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
    let {id}=req.params;
    const updatelist=await listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(updatelist);
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        updatelist.image={url,filename};
        await updatelist.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect("/listings/${id}");
};

module.exports.destroylisting=async(req,res)=>{
    let {id}=req.params;
    const deletelist=await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    console.log(deletelist);
    res.redirect("/listings");
};

module.exports.showlisting=async(req,res)=>{
    let {id}=req.params;
    const delisting=await listing.findById(id).populate({
        path:"reviews",
        populate:{path:"author"},
    }).populate("owner");
    if(!delisting){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{delisting});
};
