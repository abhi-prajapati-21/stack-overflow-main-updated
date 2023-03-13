import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../../../../Action/currentUser'

import LeftSidebar from '../../../LeftSidebar/LeftSidebar'
import PostForm from './PostForm'

const CreatePost = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.currentUserReducer)

  useEffect(() => {
   dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  }, [])

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <PostForm currentUser={currentUser}/>
      </div>
    </div>
  )
}

export default CreatePost
