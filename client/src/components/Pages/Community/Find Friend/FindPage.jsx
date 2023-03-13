import React from 'react'
import LeftSidebar from '../../../LeftSidebar/LeftSidebar'

import FindFriend from './FindFriend'

const FindPage = () => {
  
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <div className="find-friend-wrapper">
          <FindFriend />
        </div>
      </div>
    </div>
  )
}

export default FindPage
