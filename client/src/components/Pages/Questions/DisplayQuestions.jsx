import React, { Suspense } from 'react'

import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import RightSidebar from '../../RightSidebar/RightSidebar'

const QuestionDetails = React.lazy(() => import('./QuestionDetails'))

const DisplayQuestions = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <Suspense fallback={<div>Loading...</div>}>
        <QuestionDetails />
        </Suspense>
        <RightSidebar />
      </div>
    </div>
  )
}

export default DisplayQuestions
