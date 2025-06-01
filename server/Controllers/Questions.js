import Questions from "../models/Questions.js";
import mongoose from "mongoose";
import User from "../models/auth.js";

export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Questions(postQuestionData);

  try {
    await postQuestion.save();
    res.status(200).json("Posted a question succesfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("coudn'nt post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find();

    // Add profile pictures to questions and answers
    const questionsWithProfilePictures = await Promise.all(
      questionList.map(async (question) => {
        // Get profile picture for question author
        const questionAuthor = await User.findById(question.userId);

        // Get profile pictures for answer authors
        const answersWithProfilePictures = await Promise.all(
          question.answer.map(async (answer) => {
            const answerAuthor = await User.findById(answer.userId);
            return {
              ...answer.toObject(),
              profilePicture: answerAuthor?.profilePicture || null,
            };
          })
        );

        return {
          ...question.toObject(),
          profilePicture: questionAuthor?.profilePicture || null,
          answer: answersWithProfilePictures,
        };
      })
    );

    res.status(200).json(questionsWithProfilePictures);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("Question unavailable...");
  }
  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "question deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("Question unavailable...");
  }
  try {
    const question = await Questions.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted succesfully" });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};
