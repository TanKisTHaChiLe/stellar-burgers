import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getProfileOrders,
  getProfileOrdersState
} from '../../services/profile-orders/profileOrdersListSlice';
import { fecthProfileOrders } from '../../services/profile-orders/actions';
import { Preloader } from '@ui';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const isLoading = useSelector(getProfileOrdersState);
  const dispatch = useDispatch();

  // if (isLoading) {
  //   return <Preloader />;
  // }

  useEffect(() => {
    dispatch(fecthProfileOrders());
  }, []);

  const orders = useSelector(getProfileOrders);

  return (
    <>
      <ProfileOrdersUI orders={orders} />
    </>
  );
};
