import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import { askQuestion } from '../../../Action/Question'


const AskQuestion = () => {

    const [questionTitle,setQuestionTitle] = useState('');
    const [questionBody,setQuestionBody] = useState('');
    const [questionTags,setQuestionTags] = useState('');


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state)=>(state.currentUserReducer));
  
    const handleSubmit = (e) => {
        e.preventDefault();

      dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id},navigate));

    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
           setQuestionBody(questionBody + '\n')
        }
    }

  return (
    <div className="ask-question-box">
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form  onSubmit={handleSubmit}>
                <div className='ask-form-container'>
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specefic and imagine you're asking a question to another person</p>
                        <input type="text" name='questionTitle' onChange={(e)=>setQuestionTitle(e.target.value)} id='ask-ques-title' placeholder='e.g is there an R function for finding the index of an element in a vactor?'/>
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>include all the information someone would need to answer Question</p>
                        <textarea name="" id="ask-ques-body" onChange={(e)=>setQuestionBody(e.target.value)} className='textarea' onKeyPress={handleEnter}/>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to five tags to describe what your question is about</p>
                        <input type="text" name='questionBody' onChange={(e)=>setQuestionTags(e.target.value.split(' '))} id='ask-ques-tags' placeholder='e.g (typescript wordpress)'/>
                    </label>
                </div>
                <input type="submit" value='Review your question' className='review-btn'/>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
