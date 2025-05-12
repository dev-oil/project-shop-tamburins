import { useMutation } from '@tanstack/react-query';
import { loginUser, signUpUser, logoutUser } from '../api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUpUser(email, password),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
