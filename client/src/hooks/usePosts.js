import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../API';

// Fetch all posts
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.fetchAllPosts();
      return response.data;
    },
  });
};

// Upload media mutation
export const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => api.uploadMedia(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Post comment mutation
export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, comment }) => api.postComment(_id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Post like mutation
export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, value }) => api.postLike(_id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Delete post mutation
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id) => api.deletePost(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
