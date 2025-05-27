import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '../../hooks/useAuth';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    signUpMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert('회원가입 성공! 이메일을 확인하세요.');
          navigate('/login');
        },
        onError: (error) => {
          alert((error as Error).message);
        },
      }
    );
  };

  return (
    <main className='main'>
      <section className='mx-auto py-[50px] w-full md:max-w-[375px]'>
        <h2 className='text-center text-[18px] font-bold mb-[30px]'>
          회원가입
        </h2>

        <div className='mx-[15px]'>
          <form onSubmit={handleSignUp}>
            <div className='mb-[15px]'>
              <input
                type='email'
                placeholder='아이디(이메일)'
                className='w-full border p-[12px] rounded text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-[15px]'>
              <input
                type='password'
                placeholder='비밀번호'
                className='w-full border p-[12px] rounded text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='mb-[30px]'>
              <input
                type='password'
                placeholder='비밀번호 확인'
                className='w-full border p-[12px] rounded text-sm'
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded text-xs'
            >
              {signUpMutation.isPending ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className='flex justify-center gap-[10px] text-xs mt-[12px] mb-[45px]'>
            <Link to='/find/pw'>비밀번호 찾기</Link>
            <span>|</span>
            <Link to='/login'>로그인</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
