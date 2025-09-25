import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute: FC = () => <Outlet />;
