import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../API';

// Fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.fetchAllUsers();
      return response.data;
    },
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateData }) => api.updateProfile(id, updateData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.setQueryData(['currentUser'], response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
