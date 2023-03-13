import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFriendAction } from '../../../../Action/addFriend';

import Avatar from '../../../Avatar/Avatar'

const Friends = ({ allFriends }) => {

  const {requests, currentUser, users} = allFriends;

  const filteredlist = users?.filter(user => user?._id === requests?.friendId)[0]
  const friendWithId = filteredlist?.friends?.filter( friend => currentUser?.result?._id === friend.friendId)[0]
  const dispatch = useDispatch()

  const removeFriendHandler = () => {
    console.log(friendWithId?._id);
    console.log(filteredlist);
    
      dispatch(removeFriendAction({_id :currentUser?.result?._id, userId: requests.friendId, friendObjId: friendWithId?._id},
      {objId: requests._id}))
  }

  return (
    <div className='friend-card'>
      <Avatar 
      backgroundColor='purple' 
      px='17px' 
      py='13px' 
      borderRadius='50%' 
      color='white'
      >{ requests?.friendName?.charAt(0).toUpperCase() }</Avatar>
      <div className="friend-info">
        <span>{ requests?.friendName }</span>
        <div className="friends-btns-wrapper">
          <button onClick={removeFriendHandler} >Remove friend</button>
        </div>
      </div>
    </div>
  )
}

export default Friends
