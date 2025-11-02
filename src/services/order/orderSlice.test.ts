import { expect, describe, jest } from '@jest/globals';
import * as api from '@api';
import store from '../store';
import { getOrderState } from './orderSlice';
import { fetchOrderBurger, fetchOrderByNumber } from './actions';
import exp from 'constants';

const mockfetchOrderBurgerResponse = {
  success: true,
  name: 'Флюоресцентный люминесцентный бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '69065165a64177001b31c4fb',
    owner: {
      name: 'Артём',
      email: 'laanetsan@gmadil.com',
      createdAt: '2025-10-07T18:07:20.135Z',
      updatedAt: '2025-10-07T18:07:20.135Z'
    },
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-01T18:28:53.774Z',
    updatedAt: '2025-11-01T18:28:54.046Z',
    number: 92948,
    price: 3952
  }
};

const mockfetchOrderBurgerData = [
  '643d69a5c3f7b9001cfa093d',
  '643d69a5c3f7b9001cfa093e',
  '643d69a5c3f7b9001cfa093e',
  '643d69a5c3f7b9001cfa093d'
];

const mockCurrentOrder = {
  _id: '69065165a64177001b31c4fb',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-11-01T18:28:53.774Z',
  updatedAt: '2025-11-01T18:28:54.046Z',
  number: 92948
};

const mockfetchOrderByNumberResponse = {
  success: true,
  orders: [mockCurrentOrder]
};

const mockNumberOrder = 92948;
describe('Тестирвоание orderSlice', () => {
  describe('Тестирование экшена fetchOrderBurger', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Если экшен fetchOrderBurger в состоянии pending, то isloading: true', () => {
      const getOrder = jest
        .spyOn(api, 'orderBurgerApi')
        .mockReturnValue(new Promise(() => {}));

      store.dispatch(fetchOrderBurger(mockfetchOrderBurgerData));

      const orderRequest = getOrderState(store.getState()).orderRequest;

      expect(orderRequest).toBe(true);
    });

    it('Если экшен fetchOrderBurger в состоянии rejected, ошибка зписывается в стор и isloading: false', async () => {
      const errorMessage = 'error';
      const getIngredients = jest
        .spyOn(api, 'orderBurgerApi')
        .mockRejectedValue(errorMessage);

      await store.dispatch(fetchOrderBurger(mockfetchOrderBurgerData));

      const error = getOrderState(store.getState()).error;
      const orderRequest = getOrderState(store.getState()).orderRequest;

      expect(error).toBe(errorMessage);
      expect(orderRequest).toBe(false);
    });

    it('Если экшен fetchOrderBurger в состоянии fulfilled, то isLoading: false и данные записываются в стор', async () => {
      const getIngredients = jest
        .spyOn(api, 'orderBurgerApi')
        .mockResolvedValue(mockfetchOrderBurgerResponse);

      await store.dispatch(fetchOrderBurger(mockfetchOrderBurgerData));

      const orderModalData = getOrderState(store.getState()).orderModalData;
      const orderRequest = getOrderState(store.getState()).orderRequest;
      expect(orderRequest).toBe(false);
      expect(orderModalData).toEqual(mockfetchOrderBurgerResponse);
    });
  });

  describe('Тестирование экшена fetchOrderByNumber', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('Если экшен fetchOrderByNumber в состоянии pending, то isloading: true', () => {
      const getOrderByNumber = jest
        .spyOn(api, 'getOrderByNumberApi')
        .mockReturnValue(new Promise(() => {}));

      store.dispatch(fetchOrderByNumber(mockNumberOrder));

      const orderRequest = getOrderState(store.getState()).orderRequest;
      expect(orderRequest).toBe(true);
    });

    it('Если экшен fetchOrderBurger в состоянии rejected, ошибка зписывается в стор и isloading: false', async () => {
      const errorMessage = 'error';
      const getOrderByNumber = jest
        .spyOn(api, 'getOrderByNumberApi')
        .mockRejectedValue(errorMessage);

      await store.dispatch(fetchOrderByNumber(mockNumberOrder));

      const error = getOrderState(store.getState()).error;
      const orderRequest = getOrderState(store.getState()).orderRequest;

      expect(error).toBe(errorMessage);
      expect(orderRequest).toBe(false);
    });

    it('Если экшен fetchOrderBurger в состоянии fulfilled, то isLoading: false и данные записываются в стор', async () => {
      const getOrderByNumber = jest
        .spyOn(api, 'getOrderByNumberApi')
        .mockResolvedValue(mockfetchOrderByNumberResponse);

      await store.dispatch(fetchOrderByNumber(mockNumberOrder));

      const currentOrder = getOrderState(store.getState()).currentOrder;
      const orderRequest = getOrderState(store.getState()).orderRequest;
      expect(orderRequest).toBe(false);
      expect(currentOrder).toEqual(mockCurrentOrder);
    });
  });
});
