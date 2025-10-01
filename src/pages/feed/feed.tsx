import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsState } from '../../services/feedsListSlice';
import { fetchFeeds } from '../../services/feedsListSlice';
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feed, isLoading } = useSelector(getFeedsState);
  // console.log(feeds);
  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = feed?.orders || [];

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
