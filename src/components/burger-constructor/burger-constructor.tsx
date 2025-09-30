import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getState } from '../../services/burgerConstructorSlice';
import { getOrderState, fetchOrderBurger } from '../../services/orderSlice';
import { Navigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const { constructorIngridients, bun } = useSelector(getState);
  // const bun = useSelector(getBun);
  const constructorItems = {
    bun: bun,
    ingredients: constructorIngridients
  };

  const { orderRequest, orderModalData } = useSelector(getOrderState);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    else {
      const getNameIngredients = constructorItems.ingredients.map(
        (item) => item._id
      );
      const getNameBuns = constructorItems.bun._id;
      console.log([...getNameIngredients, getNameBuns, getNameBuns]);
      dispatch(
        fetchOrderBurger([...getNameIngredients, getNameBuns, getNameBuns])
      );
    }
  };
  const closeOrderModal = () => {
    <Navigate to='/' />;
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

  // return null;

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
