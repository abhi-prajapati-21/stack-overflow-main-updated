import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import { useCurrentUser } from "../../../hooks/useAuth";
import { useAskQuestion } from "../../../hooks/useQuestions";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const navigate = useNavigate();
  const { data: User } = useCurrentUser();
  const askQuestionMutation = useAskQuestion();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!User) {
      alert("Please login to ask a question");
      navigate("/Auth");
      return;
    }

    askQuestionMutation.mutate({
      questionTitle,
      questionBody,
      questionTags,
      userPosted: User.result.name,
      userId: User?.result._id,
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question-box">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specefic and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                name="questionTitle"
                onChange={(e) => setQuestionTitle(e.target.value)}
                id="ask-ques-title"
                placeholder="e.g is there an R function for finding the index of an element in a vactor?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                include all the information someone would need to answer
                Question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => setQuestionBody(e.target.value)}
                className="textarea"
                onKeyPress={handleEnter}
              />
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to five tags to describe what your question is about</p>
              <input
                type="text"
                name="questionBody"
                onChange={(e) => setQuestionTags(e.target.value.split(" "))}
                id="ask-ques-tags"
                placeholder="e.g (typescript wordpress)"
              />
            </label>
            <input
              type="submit"
              value={
                askQuestionMutation.isPending
                  ? "Posting Question..."
                  : "Review your question"
              }
              className="review-btn"
              disabled={askQuestionMutation.isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
