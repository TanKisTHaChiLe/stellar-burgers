import { useSelector, useDispatch } from '../../services/store';
import {
  isAuthCheckedSelector,
  getUserSelector
} from '../../services/userSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from './type';
import { Preloader } from '@ui';

export const ProtectedRoute = ({ onlyUnAuth = false }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    console.log(isAuthChecked);
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
