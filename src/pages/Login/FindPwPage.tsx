import { useState } from 'react';
import { useResetPasswordEmail } from '../../hooks/useAuth';

const FindPwPage = () => {
  const [email, setEmail] = useState('');
  const resetPasswordMutation = useResetPasswordEmail();

  const handleFindPw = (e: React.FormEvent) => {
    e.preventDefault();
    resetPasswordMutation.mutate(email, {
      onSuccess: () => {
        alert('비밀번호 재설정 링크가 이메일로 발송되었습니다.');
      },
      onError: (error) => {
        alert((error as Error).message);
      },
    });
  };

  return (
    <main className='main'>
      <section className='mx-auto py-[50px] w-full md:max-w-[375px]'>
        <h2 className='text-center text-[18px] font-bold mb-[30px]'>
          비밀번호 찾기
        </h2>
        <div className='mx-[15px]'>
          <form onSubmit={handleFindPw}>
            <div className='mb-[30px]'>
              <input
                type='email'
                placeholder='가입한 이메일 입력'
                className='w-full border p-[12px] rounded text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded cursor-pointer text-xs'
            >
              비밀번호 찾기
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default FindPwPage;
