import { useSelector, useDispatch } from '../../services/store';
import { getUserState } from '../../services/user/userSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from './type';
import { Preloader } from '@ui';

export const ProtectedRoute = ({ onlyUnAuth = false }: ProtectedRouteProps) => {
  const { loginUserRequest, user, isAuthChecked } = useSelector(getUserState);
  const location = useLocation();
  if (!isAuthChecked || loginUserRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return <Outlet />;
};
