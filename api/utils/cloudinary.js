const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Only configure individually if variables are present; otherwise, Cloudinary SDK
// will automatically use the CLOUDINARY_URL environment variable if set.
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    }

    const currentConfig = cloudinary.config();
    console.log("CLOUDINARY CONFIG:", {
      cloud_name: currentConfig.cloud_name,
      api_key: currentConfig.api_key ? `${currentConfig.api_key.substring(0, 4)}...` : undefined,
      has_api_secret: !!currentConfig.api_secret,
      has_cloudinary_url: !!process.env.CLOUDINARY_URL
    });

    if (!localFilePath) return null;

    // Verify if Cloudinary is configured
    if (!currentConfig.api_key && !process.env.CLOUDINARY_URL) {
      throw new Error("Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET (or CLOUDINARY_URL) in environment variables.");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary ", response.url);
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (err) {
      console.error("Temp file deletion error:", err);
    }
    return response;
  } catch (error) {
    console.error("error from uploadOnCloudinary:", error);
    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (err) {
      console.error("Temp file deletion in catch block error:", err);
    }
    throw error; // Re-throw error so the controller handles it with correct HTTP statuses!
  }
};

module.exports = { uploadOnCloudinary };

