import express from 'express'
import multer from 'multer'
 import { deletePost, fetchAllPosts, postComment, PostController, postLike } from '../Controllers/Post.js';

const router = express.Router()

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/media', upload.single('image'), PostController)
router.patch('/comment/:id', postComment)
router.patch('/like/:id', postLike)
router.get('/fetchAllPosts', fetchAllPosts)
router.delete('/delete/:id', deletePost)

export default router;