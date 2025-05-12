import { useState } from 'react';
import { useLogin } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/mypage');
        },
        onError: (error) => {
          console.error('로그인 실패:', error);
        },
      }
    );
  };

  return (
    <main>
      <section>
        <h2 className='sr-only'>로그인</h2>
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <form onSubmit={handleLogin} className='w-80 space-y-4'>
            <input
              type='email'
              placeholder='아이디(이메일)'
              className='w-full p-3 border rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='비밀번호'
              className='w-full p-3 border rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='submit'
              className='w-full py-3 bg-black text-white font-bold rounded cursor-pointer'
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
            {loginMutation.error && (
              <p className='text-red-500'>
                {(loginMutation.error as Error).message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
