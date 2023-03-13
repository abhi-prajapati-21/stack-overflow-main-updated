import User from '../models/auth.js'
import mongoose from 'mongoose';

export const addFriend = async (req, res) => {
   
  const {id: _id} = req.params;  
  const requestedId = req.body.requestedId;
  const requestedName = req.body.requestedName;

    try {
        await User.findByIdAndUpdate(_id, { $addToSet: {'friendRequests': [{ requestedId, requestedName }]}})
        res.status(200).json('request sent')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const acceptRequest = async (req,res) => {
    const {id: _id} = req.params;
    const friendId = req.body.userDetails.requestedId;
    const friendName = req.body.userDetails.requestedName;
    const objId = req.body.userDetails._id;
    const userName = req.body.userName;

    try {
        await User.findByIdAndUpdate(_id, { $addToSet: {'friends': [{ friendId, friendName }]}})
        await User.findByIdAndUpdate(friendId, { $addToSet: {'friends': [{ friendId: _id, friendName: userName }]}})
        await User.updateOne(
            { _id },
            { $pull: {'friendRequests': { _id: objId } }}
        )
        res.status(200).json('request accepted')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const rejectRequest = async (req,res) => {

    const { id: _id } = req.params;
    const objId = req.body.objId;

    try {
        await User.updateOne(
            { _id },
            { $pull: {'friendRequests': { _id: objId } }}
        )
        res.status(200).json('request rejected')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const removeFriend = async (req,res) => {

    const { id: _id } = req.params;
    const objId = req.body.Id.objId;
    const userId = req.body.userId
    const friendObjId = req.body.friendObjId

    try {
        await User.findByIdAndUpdate(
            userId ,
            { $pull: {'friends': { _id: mongoose.Types.ObjectId(friendObjId) } }}
        )
         await User.updateOne(
             { _id },
             { $pull: {'friends': { _id: objId } }}
         )
        
        res.status(200).json('friend Removed')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}