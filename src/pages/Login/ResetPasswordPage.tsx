import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 로그인 여부 확인
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError('링크가 유효하지 않거나 만료되었습니다.');
      }
    });
  }, []);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
    } else {
      setMessage('비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.');
    }
  };

  return (
    <main className='main'>
      <section className='mx-auto py-[50px] w-full md:max-w-[375px]'>
        <h2 className='text-center text-[18px] font-bold mb-[30px]'>
          비밀번호 변경
        </h2>
        <div className='mx-[15px]'>
          {error && <p className='text-red-500 mb-[20px]'>{error}</p>}
          {message && <p className='text-green-500 mb-[20px]'>{message}</p>}

          {!message && !error && (
            <form onSubmit={handlePasswordReset}>
              <div className='mb-[30px]'>
                <input
                  type='password'
                  placeholder='새 비밀번호 입력'
                  className='w-full border p-[12px] rounded text-sm'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full bg-black text-white py-3 rounded text-xs'
              >
                비밀번호 변경
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
