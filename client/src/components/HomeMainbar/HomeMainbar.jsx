import React from 'react'

import './HomeMainbar.css'
import { useLocation, useNavigate} from 'react-router-dom';
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';

const HomeMainbar = () => {
  
  const location = useLocation();
  const Navigate = useNavigate();

  const user = 1;

  const questionsList = useSelector(state => state.questionsReducer);
  //  console.log(questionsList);
  // const questionList = [

  //   {
  //     _id: 1,
  //     upVotes: 3,
  //     downVotes: 1, 
  //     votes: 2,
  //     numberOfAnswers: 0,
  //     QuestionTitle: "What is the function?",
  //     QuestionBody: "It mean to be",
  //     userId: 1,
  //     QuestionTags: ["javascript", "r", "python"],
  //     UserPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [{
  //       answerBody: "Answer",
  //       userAnswered: "Kumar",
  //       answerOn: "Jan 2",
  //       userId: 2
  //     }]
  //     },
  //     {
  //       _id: 2,
  //       upVotes: 3,
  //       downVotes: 1, 
  //       votes: 2,
  //       numberOfAnswers: 0,
  //       QuestionTitle: "What is the function?",
  //       QuestionBody: "It mean to be",
  //       userId: 2,
  //       QuestionTags: ["javascript", "r", "python"],
  //       UserPosted: "mano",
  //       askedOn: "jan 1",
  //       answer: [{
  //         answerBody: "Answer",
  //         userAnswered: "Kumar",
  //         answerOn: "Jan 2",
  //         userId: 2
  //       }]
  //       },
  //       {
  //         _id: 3,
  //         upVotes: 3,
  //         downVotes: 1, 
  //         votes: 2,
  //         numberOfAnswers: 0,
  //         QuestionTitle: "What is the function?",
  //         QuestionBody: "It mean to be",
  //         userId: 3,
  //         QuestionTags: ["javascript", "r", "python"],
  //         UserPosted: "mano",
  //         askedOn: "jan 1",
  //         answer: [{
  //           answerBody: "Answer",
  //           userAnswered: "Kumar",
  //           answerOn: "Jan 2",
  //           userId: 2
  //         }]
  //    }];
    

   
   //cheaking is user login or not
   const cheakAuth = () => {
    
   if (user === null) {
       alert("signup or login")
       Navigate('/Auth');
     }else{
       Navigate('/AskQuestion');
     }
   }
   
  
  return (
    <div className='main-bar'>
      <div className='mainbar-header'>
        {
          location.pathname === "/" ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={cheakAuth} className='ask-question'>Ask Question</button>
      </div>
       {
         questionsList.data === null ?
         <h1>Loading...</h1> :
         <>
         <p>{questionsList.data.length} Questions</p>
         <QuestionList questionsList={questionsList.data} />
         </>
       }
    </div>
  )
}

export default HomeMainbar;
