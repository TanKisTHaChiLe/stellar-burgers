import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchLogin } from '../../services/userSlice';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/userSlice';
import { Preloader } from '@ui';
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthChecked } = useSelector(getUserState);
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const req = {
      email: email,
      password: password
    };
    dispatch(fetchLogin(req));
  };

  if (!isAuthChecked) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
