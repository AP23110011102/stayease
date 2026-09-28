const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.cloudName,
    api_key:process.env.cloudApikey,
    api_secret:process.env.cloudSecret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowerdFormats:["jpg","jpeg","png"]
  },
});

module.exports={
    cloudinary,
    storage
};