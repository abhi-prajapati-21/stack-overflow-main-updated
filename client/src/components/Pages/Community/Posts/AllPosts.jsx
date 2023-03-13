import React from 'react'
import { Link } from 'react-router-dom'

import '../Community.css'
import Post from './Post'

const AllPosts = ({postsProps}) => {

  const { Posts, currentUser, users } = postsProps;

  return (
    <div className='posts-container'>
      <div className="post-container-header" style={{padding: '10px 0px'}}>
        <h1 style={{fontWeight: '400', margin: '0'}} >Community Posts</h1>
        <div className="header-btns">
          <Link to='/Community/MyFriends' className='link' >
            <button className='create-post-btn' > My Friends</button>
          </Link>
          <Link to='/Community/CreatePost' className='link' >
            <button className='create-post-btn' >Create Post</button>
          </Link>
        </div>
      </div>
      {
        Posts?.length <= 0 ? <h1>Loading...</h1>:
        <div className="post-main">
         { Posts?.map( post => <Post key={post._id} postProp={{post, currentUser, users}} />)}
        </div>
      }
      
    </div>
  )
}

export default AllPosts
