import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getProfileOrders,
  fecthProfileOrders,
  getProfileOrdersState
} from '../../services/profileOrdersListSlice';
import { Preloader } from '@ui';
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

  return <ProfileOrdersUI orders={orders} />;
};
