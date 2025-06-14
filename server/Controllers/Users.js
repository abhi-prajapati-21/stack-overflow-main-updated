import mongoose from "mongoose";
import users from "../models/auth.js";
import {
  deleteFromCloudinary,
  extractPublicId,
} from "../config/cloudinaryConfig.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        profilePicture: user.profilePicture,
        joinedOn: user.joinedOn,
        friends: user.friends,
        friendRequests: user.friendRequests,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("Question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User not found...");
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Get the current user to check if they have an existing profile picture
    const currentUser = await users.findById(_id);

    // Delete old profile picture from Cloudinary if it exists
    if (currentUser.profilePicture) {
      try {
        const oldPublicId = extractPublicId(currentUser.profilePicture);
        if (oldPublicId) {
          await deleteFromCloudinary(oldPublicId, "image");
        }
      } catch (cloudinaryError) {
        console.error(
          "Error deleting old profile picture from Cloudinary:",
          cloudinaryError
        );
        // Continue with upload even if deletion fails
      }
    }

    // req.file.path contains the Cloudinary URL
    const profilePictureUrl = req.file.path;
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { profilePicture: profilePictureUrl } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
