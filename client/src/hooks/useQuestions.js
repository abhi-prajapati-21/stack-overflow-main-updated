import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as api from '../API';

// Fetch all questions
export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const response = await api.getAllQuestions();
      return response.data;
    },
  });
};

// Ask question mutation
export const useAskQuestion = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (questionData) => api.postQuestion(questionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Delete question mutation
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => api.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Vote question mutation
export const useVoteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, value, userId }) => api.voteQuestion(id, value, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Post answer mutation
export const usePostAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, noOfAnswers, answerBody, userAnswered, userId }) =>
      api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Delete answer mutation
export const useDeleteAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, answerId, noOfAnswer }) =>
      api.deleteAnswer(id, answerId, noOfAnswer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
