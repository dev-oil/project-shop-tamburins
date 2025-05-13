import { supabase } from '../lib/supabase';
import { handleSupabaseError } from '../utils/handleSupabaseError';

// 기본 로그인
export const loginUser = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) handleSupabaseError(error);
  return data;
};

export const signUpUser = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) handleSupabaseError(error);
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) handleSupabaseError(error);
};

// 구글 로그인
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) handleSupabaseError(error);
};

// 카카오 로그인
export const signInWithKakao = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });

  if (error) handleSupabaseError(error);
};

// 패스워드 리셋
export const sendResetPasswordEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password',
  });
  if (error) handleSupabaseError(error);
};
