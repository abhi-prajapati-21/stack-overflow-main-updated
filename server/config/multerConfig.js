import multer from "multer";

// Base storage configuration
const createStorage = (filenamePrefix = "", useUniqueFilename = false) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      if (useUniqueFilename) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${filenamePrefix}${uniqueSuffix}-${file.originalname}`);
      } else {
        cb(null, file.originalname);
      }
    },
  });
};

// Image file filter
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Storage configurations for different use cases
export const postStorage = createStorage();

export const profilePictureStorage = createStorage("profile-", true);

// Multer configurations
export const postUpload = multer({
  storage: postStorage,
});

export const profilePictureUpload = multer({
  storage: profilePictureStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Generic multer configuration function
export const createMulterConfig = (options = {}) => {
  const {
    filenamePrefix = "",
    useUniqueFilename = false,
    fileFilter = null,
    limits = {},
  } = options;

  const storage = createStorage(filenamePrefix, useUniqueFilename);

  const config = { storage };

  if (fileFilter) {
    config.fileFilter = fileFilter;
  }

  if (Object.keys(limits).length > 0) {
    config.limits = limits;
  }

  return multer(config);
};
