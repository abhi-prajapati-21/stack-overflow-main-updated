import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userPosted: {
        userId: String,
        userName: String
    },
    postedOn: {type: Date, default: Date.now},
    postBody: {type: String},
    postMedia: {type: String},
    mediaType: {type: String},
    likes: { type: [String]},
    comments: [{
        userCommented: String,
       commentedOn: {type: Date, default: Date.now},
       commentBody: String
    }]
})

export default mongoose.model('Post', PostSchema);