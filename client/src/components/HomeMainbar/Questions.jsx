import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment'

const Questions = ({Question}) => {
  return (
    <div className='display-question-container'>
       
        <div className="display-vote-ans">
            <p>{Question.upVote.length - Question.downVote.length}</p>
            <p>votes</p>
        </div>
       
        <div className="display-vote-ans">
            <p>{Question.noOfAnswers}</p>
            <p>answers</p>
        </div>
      
       <div className="display-question-details">
          <Link to={`/Questions/${Question._id}`} className='question-title-link'>{ Question.questionTitle }</Link>

          <div className="display-tags-time">
             <div className="display-tags">
                    {
                        Question.questionTags.map((tag) => (
                            <p key={tag}>{tag}</p>
                        ))
                    }
          </div>      
        <p className="display-time">
            asked {moment(Question.askedOn).fromNow()} {Question.userPosted}
        </p>
           
           </div> 
       </div>
         
    </div>
  )
}

export default Questions
