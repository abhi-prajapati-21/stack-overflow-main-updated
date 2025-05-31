import React from "react";

import "./HomeMainbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useQuestions } from "../../hooks/useQuestions";
import { useCurrentUser } from "../../hooks/useAuth";

const HomeMainbar = () => {
  const location = useLocation();
  const Navigate = useNavigate();

  const { data: user } = useCurrentUser();
  const { data: questionsList, isLoading, error } = useQuestions();

  //cheaking is user login or not
  const cheakAuth = () => {
    if (user === null) {
      alert("signup or login");
      Navigate("/Auth");
    } else {
      Navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="mainbar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={cheakAuth} className="ask-question">
          Ask Question
        </button>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error loading questions</h1>
      ) : questionsList ? (
        <>
          <p>{questionsList.length} Questions</p>
          <QuestionList questionsList={questionsList} />
        </>
      ) : (
        <h1>No questions found</h1>
      )}
    </div>
  );
};

export default HomeMainbar;
