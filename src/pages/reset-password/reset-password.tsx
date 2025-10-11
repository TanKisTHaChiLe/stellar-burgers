import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { setLoginUserRequest } from '../../services/user/userSlice';
import { useDispatch } from '../../services/store';
import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(setLoginUserRequest(true));
    resetPasswordApi({ password, token })
      .then(() => {
        console.log(navigate);
        navigate('/login');
        localStorage.removeItem('resetPassword');
      })
      .catch((err) => setError(err))
      .finally(() => dispatch(setLoginUserRequest(false)));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      // navigate('/forgot-password', { replace: true });
      <Navigate to='/forgot-password' replace />;
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
