import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();

  if (user === undefined)
    return <p className='text-center'>로그인 확인 중...</p>;
  if (user) return <Navigate to='/mypage' replace />; // 로그인 상태면 마이페이지로

  return children;
};

export default PublicOnlyRoute;
