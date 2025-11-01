import { expect, describe, jest } from '@jest/globals';
import * as api from '@api';
import store from '../store';
import { fecthProfileOrders } from './actions';
import {
  getProfileOrdersState,
  getProfileOrders
} from './profileOrdersListSlice';

const mockOrders = [
  {
    _id: '68e68f2e673086001ba8c943',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный люминесцентный метеоритный бургер',
    createdAt: '2025-10-08T16:19:58.989Z',
    updatedAt: '2025-10-08T16:20:00.195Z',
    number: 90636
  },
  {
    _id: '68e68f35673086001ba8c944',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный люминесцентный метеоритный бургер',
    createdAt: '2025-10-08T16:20:05.900Z',
    updatedAt: '2025-10-08T16:20:07.024Z',
    number: 90637
  },
  {
    _id: '690508aba64177001b31c24d',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-10-31T19:06:19.252Z',
    updatedAt: '2025-10-31T19:06:19.555Z',
    number: 92844
  },
  {
    _id: '6905256ba64177001b31c2ae',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-10-31T21:08:59.265Z',
    updatedAt: '2025-10-31T21:08:59.508Z',
    number: 92854
  },
  {
    _id: '6905b699a64177001b31c362',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-01T07:28:25.071Z',
    updatedAt: '2025-11-01T07:28:25.345Z',
    number: 92864
  },
  {
    _id: '6905bd92a64177001b31c36d',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-01T07:58:10.091Z',
    updatedAt: '2025-11-01T07:58:10.332Z',
    number: 92865
  },
  {
    _id: '6905bf26a64177001b31c374',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-01T08:04:54.829Z',
    updatedAt: '2025-11-01T08:04:55.108Z',
    number: 92866
  },
  {
    _id: '6905c342a64177001b31c37d',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-01T08:22:26.771Z',
    updatedAt: '2025-11-01T08:22:27.080Z',
    number: 92872
  }
];

describe('Тестирование profileOrdersSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Если экшен в состоянии pending, то isloading: true', () => {
    const getOrders = jest
      .spyOn(api, 'getOrdersApi')
      .mockReturnValue(new Promise(() => {}));

    store.dispatch(fecthProfileOrders());

    const isloading = getProfileOrdersState(store.getState()).isLoading;

    expect(isloading).toBe(true);
  });

  it('Если экшен в состоянии rejected, ошибка зписывается в стор и isloading: false', async () => {
    const errorMessage = 'error';
    const getOrders = jest
      .spyOn(api, 'getOrdersApi')
      .mockRejectedValue(errorMessage);

    await store.dispatch(fecthProfileOrders());

    const isLoading = getProfileOrdersState(store.getState()).isLoading;
    const error = getProfileOrdersState(store.getState()).error;

    expect(isLoading).toBe(false);
    expect(error).toBe(errorMessage);
  });

  it('Если экшен в состоянии fulfilled, то isLoading: false и данные записываются в стор', async () => {
    const getOrders = jest
      .spyOn(api, 'getOrdersApi')
      .mockResolvedValue(mockOrders);

    await store.dispatch(fecthProfileOrders());

    const orders = getProfileOrders(store.getState());
    const isLoading = getProfileOrdersState(store.getState()).isLoading;
    expect(isLoading).toBe(false);
    expect(orders).toEqual(mockOrders);
  });
});
