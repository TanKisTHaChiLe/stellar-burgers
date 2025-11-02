import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrderByNumber } from '../../services/order/actions';
import { getState } from '../../services/ingredients/ingredientsSlice';
export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { ingredients } = useSelector(getState);
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const orderData = useSelector((state) => {
    let order = state.feeds.feed?.orders.find(
      (item) => item.number + '' === params.number
    );
    if (order) {
      return order;
    }

    order = state.orders.orders.find(
      (item) => item.number + '' === params.number
    );
    if (order) {
      return order;
    }

    return state.order.currentOrder;
  });

  useEffect(() => {
    if (!orderData && params.number) {
      dispatch(fetchOrderByNumber(+params.number));
    }
  }),
    [dispatch];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const status = orderData.status;
    return {
      ...orderData,
      status,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
