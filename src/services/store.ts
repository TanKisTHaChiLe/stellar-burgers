import { configureStore } from '@reduxjs/toolkit';
import { combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './ingredients/ingredientsSlice';
import burgerConstructorSlice from './burger-constructor/burgerConstructorSlice';
import orderSlice from './order/orderSlice';
import feedsSlice from './feed/feedsListSlice';
import userSlice from './user/userSlice';
import profileOrdersSlice from './profile-orders/profileOrdersListSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  feedsSlice,
  userSlice,
  profileOrdersSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
