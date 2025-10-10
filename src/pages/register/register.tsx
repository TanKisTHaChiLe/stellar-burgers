import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchRegister } from '../../services/user/actions';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/user/userSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { loginUserRequest } = useSelector(getUserState);

  if (loginUserRequest) {
    return <Preloader />;
  }
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const register = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(fetchRegister(register));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
