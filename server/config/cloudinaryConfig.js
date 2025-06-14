import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary storage for posts (images and videos)
const postCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stack-overflow/posts",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi", "webm"],
    resource_type: "auto", // Automatically detect if it's image or video
    transformation: [
      {
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  },
});

// Cloudinary storage for profile pictures
const profileCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stack-overflow/profiles",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    resource_type: "image",
    transformation: [
      {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "face",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  },
});

// Image file filter
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Media file filter (images and videos)
const mediaFileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

// Multer configurations with Cloudinary
export const postUpload = multer({
  storage: postCloudinaryStorage,
  fileFilter: mediaFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for videos
  },
});

export const profilePictureUpload = multer({
  storage: profileCloudinaryStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for profile pictures
  },
});

// Export cloudinary instance for direct use
export { cloudinary };

// Helper function to delete files from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = "auto") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

// Helper function to extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl) return null;

  // Extract public ID from Cloudinary URL
  // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
  const parts = cloudinaryUrl.split("/");
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0];

  // Include folder path if present
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex !== -1 && uploadIndex < parts.length - 2) {
    const folderParts = parts.slice(uploadIndex + 2, -1);
    return folderParts.length > 0
      ? `${folderParts.join("/")}/${publicId}`
      : publicId;
  }

  return publicId;
};
