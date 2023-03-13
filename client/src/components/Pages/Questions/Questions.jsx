import React from 'react'

import '../../../App.css';

import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import RightSidebar from '../../RightSidebar/RightSidebar'
import HomeMainbar from '../../HomeMainbar/HomeMainbar'

const Questions = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Questions;
