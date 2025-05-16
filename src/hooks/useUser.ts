import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useUser = () => {
  const [user, setUser] = useState<
    | Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user']
    | null
    | undefined
  >(undefined);

  useEffect(() => {
    // 세션 복구 시도
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // 로그인/로그아웃 상태 실시간 갱신
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user };
};
