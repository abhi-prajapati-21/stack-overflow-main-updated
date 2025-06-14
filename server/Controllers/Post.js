import Post from "../models/Post.js";
import User from "../models/auth.js";
import {
  deleteFromCloudinary,
  extractPublicId,
} from "../config/cloudinaryConfig.js";

export const PostController = async (req, res) => {
  const postBody = req.body.postBody;
  const userName = req.body.userName;
  const userId = req.body.userId;

  // Get Cloudinary URL instead of local file path
  const postMedia = req.file ? req.file.path : null;
  const cloudinaryPublicId = req.file ? req.file.filename : null;

  const identifyMediaType = () => {
    if (req?.file?.mimetype.includes("image")) {
      return "image";
    } else if (req?.file?.mimetype.includes("video")) {
      return "video";
    } else {
      return null;
    }
  };
  const mediaType = identifyMediaType();

  try {
    const createPost = await Post.create({
      userPosted: { userId: userId, userName: userName },
      postBody,
      mediaType,
      postMedia, // This will now be the Cloudinary URL
      cloudinaryPublicId, // Store the public ID for deletion purposes
      likes: [],
    });
    res.status(200).json({ result: createPost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody, userCommented, userId } = req.body;

  try {
    await Post.findByIdAndUpdate(_id, {
      $addToSet: { comments: [{ userCommented, userId, commentBody }] },
    });
    res.status(200).json("posted");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postLike = async (req, res) => {
  const { id: _id } = req.params;
  const value = req.body.value;
  const userId = req.body.userId;

  try {
    const singlePost = await Post.findById(_id);
    const like = singlePost.likes.findIndex((id) => id === String(userId));

    if (value === "likes") {
      if (like !== -1) {
        singlePost.likes = singlePost.likes.filter(
          (id) => id !== String(userId)
        );
      } else if (like === -1) {
        singlePost.likes.push(userId);
      } else {
        singlePost.likes = singlePost.likes.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Post.findByIdAndUpdate(_id, singlePost);
    res.status(200).json("liked");
  } catch (error) {
    res.status(404).json({ message: error.messge });
  }
};

export const fetchAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    const allPostsDetails = [];

    for (const post of allPosts) {
      // Get user profile picture for the post author
      const postAuthor = await User.findById(post.userPosted.userId);

      // Get profile pictures for commenters
      const commentsWithProfilePictures = await Promise.all(
        post.comments.map(async (comment) => {
          // Use userId if available, otherwise fallback to name lookup
          const commenter = comment.userId
            ? await User.findById(comment.userId)
            : await User.findOne({ name: comment.userCommented });
          return {
            ...comment.toObject(),
            profilePicture: commenter?.profilePicture || null,
          };
        })
      );

      allPostsDetails.push({
        _id: post._id,
        userPosted: {
          ...post.userPosted,
          profilePicture: postAuthor?.profilePicture || null,
        },
        postedOn: post.postedOn,
        postBody: post.postBody,
        postMedia: post.postMedia,
        mediaType: post.mediaType,
        likes: post.likes,
        comments: commentsWithProfilePictures,
      });
    }

    res.status(200).json(allPostsDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    // Find the post first to get the Cloudinary public ID
    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete media from Cloudinary if it exists
    if (post.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(post.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // Continue with post deletion even if Cloudinary deletion fails
      }
    }

    // Delete the post from database
    await Post.findByIdAndRemove(_id);
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
