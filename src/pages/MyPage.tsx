import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useUser } from '../hooks/useUser';

const MyPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <main className='main'>
      <section>
        <div className='p-[50px] text-center'>
          <h2>마이페이지</h2>
          <p>{user?.email}</p>
          <button
            onClick={handleLogout}
            className='mt-4 bg-black text-white py-2 px-4 rounded'
          >
            로그아웃
          </button>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
