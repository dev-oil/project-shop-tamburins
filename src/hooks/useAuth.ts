import { useMutation } from '@tanstack/react-query';
import {
  loginUser,
  signUpUser,
  logoutUser,
  sendResetPasswordEmail,
} from '../api/auth';
import { signInWithGoogle, signInWithKakao } from '../api/auth';

// 기본 로그인
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

// 구글 로그인
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
};

// 카카오 로그인
export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: signInWithKakao,
  });
};

// 비밀번호 재설정
export const useResetPasswordEmail = () => {
  return useMutation({
    mutationFn: (email: string) => sendResetPasswordEmail(email),
  });
};
