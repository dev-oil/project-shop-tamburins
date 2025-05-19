import { supabase } from '../lib/supabase';
import { handleAuthRequest } from '../utils/supabaseUtils';

// 기본 로그인
export const loginUser = (email: string, password: string) =>
  handleAuthRequest(supabase.auth.signInWithPassword({ email, password }));

export const signUpUser = (email: string, password: string) =>
  handleAuthRequest(supabase.auth.signUp({ email, password }));

export const logoutUser = () => handleAuthRequest(supabase.auth.signOut());

// 구글 로그인
export const signInWithGoogle = () =>
  handleAuthRequest(supabase.auth.signInWithOAuth({ provider: 'google' }));

// 카카오 로그인
export const signInWithKakao = () =>
  handleAuthRequest(supabase.auth.signInWithOAuth({ provider: 'kakao' }));

// 패스워드 리셋
export const sendResetPasswordEmail = (email: string) =>
  handleAuthRequest(
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    })
  );
