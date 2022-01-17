const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config = {
  cloud_name: process.env.CLOUDINARY_CLOUDINARY_NAME,
  api_key: "699156839599348",
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "ecommerce images",
  allowedFormats: ["jpg", "png"],
  transformation: [
    {
      width: 800,
      height: 800,
      crop: "limit",
    },
  ],
});

const upload = multer({ storage: storage });

module.exports = upload;
