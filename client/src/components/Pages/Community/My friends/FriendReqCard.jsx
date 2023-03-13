import React from 'react'
import { useDispatch } from 'react-redux'
import { acceptRequestAction, removeRequestAction } from '../../../../Action/addFriend';

import Avatar from '../../../Avatar/Avatar'

const FriendReqCard = ({ allRequests }) => {

  const { requests, currentUser } = allRequests;

  const dispatch = useDispatch();

  const acceptRequestHandler = () => {
    dispatch(acceptRequestAction(
      {_id :currentUser?.result?._id, userName: currentUser?.result?.name}, requests))
  }

  const rejectRequestHandler = () => {
    dispatch(removeRequestAction(
      currentUser?.result?._id, {objId: requests._id}))
  }

  return (
    <div className='friend-req-card'>
      <Avatar 
      backgroundColor='purple' 
      px='17px' 
      py='13px' 
      borderRadius='50%' 
      color='white'
      >{ requests?.requestedName?.charAt(0).toUpperCase() }</Avatar>
      <div className="req-card-info">
        <span>{ requests?.requestedName }</span>
        <div className="btns-wrapper">
          <button onClick={acceptRequestHandler} >Accept</button>
          <button onClick={rejectRequestHandler} >Reject</button>
        </div>
        
      </div>
    </div>
  )
}

export default FriendReqCard
