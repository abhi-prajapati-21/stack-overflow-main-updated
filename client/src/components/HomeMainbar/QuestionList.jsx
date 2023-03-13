import React from 'react'

import Questions from './Questions'

const QuestionList = ({questionsList}) => {
  return (
    <>
      
      {
        questionsList.map((Question)=>(
           <Questions Question={Question} key={Question._id} />
        ))
      }

    </>
  )
}

export default QuestionList
