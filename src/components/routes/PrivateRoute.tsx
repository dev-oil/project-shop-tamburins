import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();

  if (user === undefined)
    return <p className='text-center'>로그인 확인 중...</p>;
  if (!user) return <Navigate to='/login' replace />;

  return children;
};

export default PrivateRoute;
