import React from 'react'
import { useDispatch } from 'react-redux'
import { addFriendAction } from '../../../../Action/addFriend'

import './FindFriend.css'
import Avatar from '../../../Avatar/Avatar'

const FindedFriend = ({ userProps }) => {

  const { user, currentUser, Allusers } = userProps;
  const dispatch = useDispatch()

  const userPosted = Allusers.filter(singleUser => singleUser?._id === user?._id)[0]

  const addFriendHandler = () => {

     if(!currentUser?.result){
       alert('please login or signup first')
       return null;
     }
  
      dispatch(addFriendAction( 
         user?._id, {
        requestedId: currentUser?.result?._id,
        requestedName: currentUser?.result?.name
      }))
  }

  let isInclude = [];
  isInclude = userPosted?.friendRequests?.filter( friend => friend?.requestedId  === currentUser?.result?._id )[0]
  const isFriend = userPosted?.friends?.filter( friend => friend?.friendId  === currentUser?.result?._id )[0]

  return (
    <div className='finded-friend-card'>
      <Avatar 
        backgroundColor='dodgerblue' 
        px='16px' 
        py='10px' 
        borderRadius='50%' 
        color='white'
        >{user?.name?.charAt(0).toUpperCase()}</Avatar>
        <h5 style={{margin: '0px 0px 0px 10px'}} >{user?.name}</h5>
        {
          isInclude ? <button className= {` ${currentUser?.result?._id === user?._id && 'd-none'}`} >pending...</button> :
          isFriend ? <button className= {` ${currentUser?.result?._id === user?._id && 'd-none'}`} >Friend</button> :
          <button onClick={addFriendHandler} className= {` ${user?._id === currentUser?.result?._id && 'd-none'}`} >Add Friend</button>
        }     
    </div>
  )
}

export default FindedFriend
