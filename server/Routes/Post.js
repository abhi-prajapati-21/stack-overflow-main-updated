import express from "express";
import {
  deletePost,
  fetchAllPosts,
  postComment,
  PostController,
  postLike,
} from "../Controllers/Post.js";
import { postUpload } from "../config/cloudinaryConfig.js";

const router = express.Router();

router.post("/media", postUpload.single("image"), PostController);
router.patch("/comment/:id", postComment);
router.patch("/like/:id", postLike);
router.get("/fetchAllPosts", fetchAllPosts);
router.delete("/delete/:id", deletePost);

export default router;
