import Post from '../models/Post.js'

export const PostController = async (req, res) => {
       
        const postBody = req.body.postBody;
        const userName = req.body.userName;
        const userId = req.body.userId;
        const postMedia = req.file ? req.file.path : null;
        
        const identifyMediaType = () => {
         if (req?.file?.mimetype.includes('image')) {
            return 'image';
         }else if (req?.file?.mimetype.includes('video')) {
            return 'video';
         }else{ return null; }
        }
        const mediaType =  identifyMediaType();
        
      try {
         const createPost = await Post.create({userPosted:{ userId: userId, userName: userName }, postBody, mediaType, postMedia, likes: Post.likes}) 
         res.status(200).json({result: createPost})
      } catch (error) {
         res.status(404).json({message: error.message})
      }
 }

 export const postComment = async (req, res) => {

   const {id: _id} = req.params;
   const {commentBody }= req.body;
   const {userCommented }= req.body;
     
   try {
       await Post.findByIdAndUpdate(_id, 
       {
         $addToSet: { comments: [{ userCommented, commentBody }] },
       });
      res.status(200).json('posted')
   } catch (error) {
      res.status(404).json({message: error.message})
   }
 }

 export const postLike = async (req, res) => {
    
   const {id: _id} = req.params;
   const  value  = req.body.value;
   const  userId  = req.body.userId;
   
   try {
       const singlePost = await Post.findById(_id)
       const like = singlePost.likes.findIndex((id) => id === String(userId))

       if(value === 'likes'){
           if(like !== -1){
               singlePost.likes = singlePost.likes.filter((id) => id !== String(userId))
           } 
           else if(like === -1){
               singlePost.likes.push(userId)
           }else{
               singlePost.likes = singlePost.likes.filter((id) => id !== String(userId))
           }
       }
       await Post.findByIdAndUpdate( _id, singlePost )
       res.status(200).json('liked')
   } catch (error) {
       res.status(404).json({ message: error.messge})
   }
}

 export const fetchAllPosts = async (req, res) => {
     
   try {
       const allPosts = await Post.find();
       const allPostsDetails = [];
       
       allPosts.forEach(post => {
           allPostsDetails.push({
               _id: post._id,
               userPosted: post.userPosted,
               postedOn: post.postedOn,
               postBody: post.postBody,
               postMedia: post.postMedia,
               mediaType: post.mediaType,
               likes: post.likes,
               comments: post.comments
           })
       })
       res.status(200).json(allPostsDetails)
   } catch (error) {
       res.status(400).json({message: error.message})
   }
}

export const deletePost = async (req, res) => {
    const { id: _id} = req.params;
   try {
       await Post.findByIdAndRemove(_id);
       res.status(200).json({message: 'post deleted'})
   } catch (error) {
       res.status(404).json({message: error.message})
   }
}