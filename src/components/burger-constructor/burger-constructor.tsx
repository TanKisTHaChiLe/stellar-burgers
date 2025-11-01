import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getState } from '../../services/burger-constructor/burgerConstructorSlice';
import { getOrderState, clearModalData } from '../../services/order/orderSlice';
import { fetchOrderBurger } from '../../services/order/actions';
import { clearConstructorItems } from '../../services/burger-constructor/burgerConstructorSlice';
import { getUserState } from '../../services/user/userSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const location = useLocation();
  const { constructorIngridients, bun } = useSelector(getState);
  const { isAuthenticated } = useSelector(getUserState);
  const navigate = useNavigate();
  const constructorItems = {
    bun: bun,
    ingredients: constructorIngridients
  };
  const { orderRequest, orderModalData } = useSelector(getOrderState);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    const getNameIngredients = constructorItems.ingredients.map(
      (item) => item._id
    );
    const getNameBuns = constructorItems.bun._id;
    console.log([getNameBuns, ...getNameIngredients, getNameBuns]);
    dispatch(
      fetchOrderBurger([getNameBuns, ...getNameIngredients, getNameBuns])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearModalData());
    dispatch(clearConstructorItems());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData?.order || null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
