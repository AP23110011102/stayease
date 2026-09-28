const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listings.js");
const MONGODB='mongodb://127.0.0.1:27017/Wanderlust'
main().then(()=>{
    console.log("working succesfully");
}).catch((err)=>{
    console.log(err);
});
async function main() {
  await mongoose.connect(MONGODB);
}
const initDB=async () => {
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6889c8b694097f2297071c9a"}));
    await listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();