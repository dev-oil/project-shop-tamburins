import { supabase } from '../lib/supabase';

// 기본 로그인
export const loginUser = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const signUpUser = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

// 구글 로그인
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw new Error(error.message);
};
