import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as api from '../API';

// Auth state management
export const useAuthState = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: () => {
      const profile = localStorage.getItem('Profile');
      return profile ? JSON.parse(profile) : null;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (authData) => api.logIn(authData),
    onSuccess: (response) => {
      const data = response.data;
      localStorage.setItem('Profile', JSON.stringify(data));
      queryClient.setQueryData(['auth'], data);
      queryClient.setQueryData(['currentUser'], data);
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Signup mutation
export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (authData) => api.signUp(authData),
    onSuccess: (response) => {
      const data = response.data;
      localStorage.setItem('Profile', JSON.stringify(data));
      queryClient.setQueryData(['auth'], data);
      queryClient.setQueryData(['currentUser'], data);
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Logout function
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    localStorage.clear();
    queryClient.setQueryData(['auth'], null);
    queryClient.setQueryData(['currentUser'], null);
    queryClient.clear();
    navigate('/');
  };
};

// Current user query
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => {
      const profile = localStorage.getItem('Profile');
      return profile ? JSON.parse(profile) : null;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
