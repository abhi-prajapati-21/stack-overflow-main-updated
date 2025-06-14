import express from "express";

import { login, signup } from "../Controllers/auth.js";
import {
  getAllUsers,
  updateProfile,
  uploadProfilePicture,
} from "../Controllers/Users.js";
import auth from "../Middlewares/auth.js";
import { profilePictureUpload } from "../config/cloudinaryConfig.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);
router.patch(
  "/upload-profile-picture/:id",
  auth,
  profilePictureUpload.single("profilePicture"),
  uploadProfilePicture
);

export default router;
