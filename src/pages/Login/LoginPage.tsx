import { useState } from 'react';
import { useKakaoLogin, useLogin } from '../../hooks/useAuth';
import { useGoogleLogin } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();
  const kakaoLoginMutation = useKakaoLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/mypage');
        },
        onError: (error) => {
          console.error('로그인 실패:', error);
          setLoginError('이메일 또는 비밀번호를 다시 확인해주세요.');
        },
      }
    );
  };

  return (
    <main className='main'>
      <section className='mx-auto py-[50px] w-full md:max-w-[375px]'>
        <ul className='flex border-b border-gray-300 relative'>
          <li className='flex-1 text-center relative after:content-[""] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[1px] after:bg-black'>
            <Link to='/login' className='block py-[15px] text-xs font-bold'>
              로그인
            </Link>
          </li>
          <li className='flex-1 text-center'>
            <Link
              to='/order/guest'
              className='block py-[15px] text-gray-500 text-xs'
            >
              비회원 주문조회
            </Link>
          </li>
        </ul>

        <div className='mx-[15px] mt-[40px]'>
          <form onSubmit={handleLogin}>
            <div className='mb-[10px]'>
              <input
                type='email'
                placeholder='아이디(이메일)'
                className='w-full border p-[10px] rounded text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-[30px]'>
              <input
                type='password'
                placeholder='비밀번호'
                maxLength={16}
                className='w-full border p-[10px] rounded text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded text-xs'
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
            {loginError && (
              <p className='text-red-500 text-xs mt-[10px] text-center'>
                {loginError}
              </p>
            )}
          </form>

          <div className='flex justify-center gap-[10px] text-xs mt-[12px] mb-[45px]'>
            <Link to='/find/pw'>비밀번호 찾기</Link>
            <span>|</span>
            <Link to='/signup'>회원가입</Link>
          </div>

          <div className='flex flex-col items-center gap-[10px]'>
            <button
              onClick={() => googleLoginMutation.mutate()}
              type='button'
              className='flex items-center gap-2 bg-gray-100 w-full justify-center py-3 rounded text-xs'
            >
              <FaGoogle />
              구글 로그인
            </button>
            <button
              onClick={() => kakaoLoginMutation.mutate()}
              type='button'
              className='flex items-center gap-2 bg-[#f7e600] w-full justify-center py-3 rounded text-xs'
            >
              <RiKakaoTalkFill size={15} />
              카카오 로그인
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
