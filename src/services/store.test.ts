import ingredientsSlice from './ingredients/ingredientsSlice';
import burgerConstructorSlice from './burger-constructor/burgerConstructorSlice';
import orderSlice from './order/orderSlice';
import feedsSlice from './feed/feedsListSlice';
import userSlice from './user/userSlice';
import profileOrdersSlice from './profile-orders/profileOrdersListSlice';
import store, { rootReducer } from './store';

describe('', () => {
  it('Стор существует и не undefinded', () => {
    expect(store).toBeDefined();
  });

  it('rootReducer, с вызовом экшена, который не обрабатывается ни одним слайсом, возвращает корректное состояние в хранилище', () => {
    const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(testState).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: burgerConstructorSlice.getInitialState(),
      order: orderSlice.getInitialState(),
      feeds: feedsSlice.getInitialState(),
      user: userSlice.getInitialState(),
      orders: profileOrdersSlice.getInitialState()
    });
  });
});
