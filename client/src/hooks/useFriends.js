import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../API';

// Add friend mutation
export const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, nameDetails }) => api.addFriend(_id, nameDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Accept friend request mutation
export const useAcceptRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ obj, userDetails }) => {
      const { _id, userName } = obj;
      return api.acceptRequest(_id, { userDetails, userName });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Remove friend request mutation
export const useRemoveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, userId }) => api.removeRequest(_id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Remove friend mutation
export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ obj, Id }) => {
      const { _id, userId, friendObjId } = obj;
      return api.removeFriend(_id, { Id, userId, friendObjId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
