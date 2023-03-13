import express from 'express'
import { 
    acceptRequest, 
    addFriend,
    rejectRequest, 
    removeFriend } from '../Controllers/Friend.js';

const router = express.Router()

router.patch('/add/:id', addFriend)
router.patch('/accept/:id', acceptRequest)
router.patch('/reject/:id', rejectRequest)
router.patch('/remove/:id', removeFriend)

export default router;