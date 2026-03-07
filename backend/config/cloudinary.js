const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileBuffer) => {
  const base64Image = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "prescriptions",
  });

  return result;
};

module.exports = { uploadToCloudinary };