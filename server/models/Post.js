import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  userPosted: {
    userId: String,
    userName: String,
  },
  postedOn: { type: Date, default: Date.now },
  postBody: { type: String },
  postMedia: { type: String }, // Cloudinary URL
  cloudinaryPublicId: { type: String }, // For deletion purposes
  mediaType: { type: String },
  likes: { type: [String] },
  comments: [
    {
      userCommented: String,
      userId: String,
      commentedOn: { type: Date, default: Date.now },
      commentBody: String,
    },
  ],
});

export default mongoose.model("Post", PostSchema);
