import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import copy from 'copy-to-clipboard';

import Avatar from '../../../components/Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers';
import upVote from '../../../assets/sort-up.svg'
import downVote from '../../../assets/sort-down.svg'
import './Questions.css'
import { deleteQuestion, postAnswer, voteQuestion } from '../../../Action/Question';

const QuestionDetails = () => {

   const { id } = useParams();

   const [Answer, setAnswer] = useState('')

   const questionsList = useSelector(state => state.questionsReducer);
   const User = useSelector(state => (state.currentUserReducer))

   const Navigate = useNavigate()
   const dispatch = useDispatch()
   const location = useLocation()

   const url = 'https://stack-overflow-abhi.netlify.app'

   const handlePostAns = (e, answerLength) => {
     e.preventDefault();
     if (User === null) {
      alert("signup or login to answer a question");
      Navigate('/Auth')
     }else{
      if (Answer === '') {
         alert('Enter a answer before submitting')
      }else{
        dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User?.result._id }));
      }
     }  
   }

    const handleShare = () => {
      copy(url + location.pathname)
      alert('Copied url :' + url + location.pathname);
    }

    const handleDelete = () => {
      dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
      dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () => {
      dispatch(voteQuestion(id, 'downVote', User.result._id))
    }


  return (
    <div className='question-details-page'>
      {
        questionsList.data === null ?
        <h1>Loading...</h1> :
        <>
         {
            questionsList.data.filter(question => question._id === id).map(question => (
                <div key={question._id}>
                  <section className='question-details-container'>
                    
                      <h1>{question.questionTitle}</h1>
                       
                       <div className='question-details-container-2'>
                       
                          <div className='questions-votes'>
                              <img src={upVote} alt="" width='18' onClick={handleUpVote} className='vote-icons'/>
                              <p>{question.upVote.length - question.downVote.length}</p>
                              <img src={downVote} alt="" width='18' onClick={handleDownVote} className='vote-icons'/>
                          </div>
                          <div style={{width: "100%"}}>
                                <p className='question-body'>{question.questionBody}</p>
                                <div className="question-details-tags">
                                    {
                                        question.questionTags.map(tag => (
                                          <p key={tag} className="ans-tag">{tag}</p>
                                        ))
                                    }
                                </div>
                                <div className="question-action-user">
                                    <div>
                                        <button type='button' onClick={handleShare}>Share</button>
                                        {
                                          User?.result?._id === question?.userId && (
                                            <button type='button' onClick={handleDelete}>Delete</button>              
                                          )
                                        }
                                    </div>
                                    <div >
                                        <p style={{margin:"0"}}>asked {moment(question.askedOn).fromNow()}</p>
                                        <Link to={`/Users/${question.userId}`} className='user-link' style={{margin:"5px"}}>
                                            <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                            <div>
                                                <p >{question.userPosted}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                          </div>
                       </div>
                  </section>
                    {
                        question.numberOfAnswers !== 0 &&
                        (
                           <section className='ans-box'>
                            <h3>{ question.noOfAnswers} Answers</h3>
                            <DisplayAnswers key={question._id} question={question} handleShare={handleShare}/>
                           </section>
                        )
                    }
                   <section className='post-ans-container'>
                       <h3>You Answer</h3>
                       <form onSubmit={(e)=>handlePostAns(e, question.answer.length)}>
                        <textarea name="" id="" cols="30" rows="10"  onChange={(e)=>setAnswer(e.target.value)}></textarea><br />
                        <input type="submit" className='post-ans-btn' value="Post Your Answer" />
                       </form>
                       <p>
                          Browse other Question tagged &nbsp; 
                          {
                            question.questionTags.map(tag => (
                                <Link to='/Tags' key={tag} className="ans-tag">{tag}</Link>
                            )) 
                          }
                          &nbsp;  or &nbsp; 
                           <Link to='/AskQuestion' style={{textDecoration:"none", color:"#009dff"}}>Ask your own Question.</Link>

                       </p>
                   </section>
                </div>
            ))
         }
        </>
      }
    </div>
  )
}

export default QuestionDetails
