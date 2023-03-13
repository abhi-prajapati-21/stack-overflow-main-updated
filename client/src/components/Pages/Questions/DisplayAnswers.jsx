import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../../Avatar/Avatar'
import { deleteAnswer } from '../../../Action/Question'
import './Questions.css'

const DisplayAnswers = ({question, handleShare}) => {

  const User = useSelector(state => (state.currentUserReducer))
   
  const dispatch = useDispatch()
  const { id } = useParams()

  const handleDelete = (answerId, noOfAnswers) => {
   dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
  }

  return (
    <div className='main-display-ans'>
      {
         question.answer.map(ans => (
            <div className='display-ans' key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className="question-action-user">
                <div>
                    <button type='button' onClick={handleShare}>Share</button>
                    {
                      User?.result?.name === ans.userAnswered && (
                        <button type='button' onClick={ () => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>              
                      )
                    }
                </div>
                <div>
                    <p style={{margin:"0"}}>Answered on {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/Users/${ans.userId}`} className='user-link'>
                        <Avatar backgroundColor="green" px="8px" py="5px" color="white">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                        <div>
                            {ans.userAnswered}
                        </div>
                    </Link>
                </div>
                </div>
            </div>
         )) 
      }
    </div>
  )
}

export default DisplayAnswers
