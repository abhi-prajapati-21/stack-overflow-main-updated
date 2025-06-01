import Post from "../models/Post.js";
import User from "../models/auth.js";

export const PostController = async (req, res) => {
  const postBody = req.body.postBody;
  const userName = req.body.userName;
  const userId = req.body.userId;
  const postMedia = req.file ? req.file.path : null;

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
      postMedia,
      likes: Post.likes,
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
    await Post.findByIdAndRemove(_id);
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
