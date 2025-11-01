import { expect, describe, jest } from '@jest/globals';
import store from '../store';
import * as api from '@api';
import { fetchFeeds } from './actions';
import { getFeedsState, getFeed } from './feedsListSlice';
const mockFeeds = {
  success: true,
  orders: [
    {
      _id: '69063fc7a64177001b31c4c7',
      status: 'done',
      name: 'Фалленианский краторный бургер',
      createdAt: '2025-11-01T17:13:43.091Z',
      updatedAt: '2025-11-01T17:13:43.371Z',
      number: 92942,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093c'
      ]
    },
    {
      _id: '69063a32a64177001b31c4c1',
      status: 'done',
      name: 'Метеоритный краторный био-марсианский экзо-плантаго фалленианский бургер',
      createdAt: '2025-11-01T16:49:54.880Z',
      updatedAt: '2025-11-01T16:49:55.176Z',
      number: 92941,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0940'
      ]
    },
    {
      _id: '690638c3a64177001b31c4ba',
      status: 'done',
      name: 'Био-марсианский фалленианский метеоритный краторный бургер',
      createdAt: '2025-11-01T16:43:47.067Z',
      updatedAt: '2025-11-01T16:43:47.337Z',
      number: 92940,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ]
    }
  ],
  total: 16936,
  totalToday: 3
};

describe('', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Если экшен в состоянии pending, то isloading: true', () => {
    const getFeeds = jest
      .spyOn(api, 'getFeedsApi')
      .mockReturnValue(new Promise(() => {}));
    store.dispatch(fetchFeeds());

    const isLoading = getFeedsState(store.getState()).isLoading;

    expect(isLoading).toBe(true);
  });

  it('Если экшен в состоянии rejected, ошибка зписывается в стор и isloading: false', async () => {
    const errorMessage = 'error';
    const getFeeds = jest
      .spyOn(api, 'getFeedsApi')
      .mockRejectedValue(errorMessage);
    await store.dispatch(fetchFeeds());

    const isLoading = getFeedsState(store.getState()).isLoading;
    const error = getFeedsState(store.getState()).error;

    expect(isLoading).toBe(false);
    expect(error).toBe(errorMessage);
  });

  it('Если экшен в состоянии fulfilled, то isLoading: false и данные записываются в стор', async () => {
    const getFeeds = jest
      .spyOn(api, 'getFeedsApi')
      .mockResolvedValue(mockFeeds);

    await store.dispatch(fetchFeeds());

    const feed = getFeed(store.getState());
    const isLoading = getFeedsState(store.getState()).isLoading;

    expect(isLoading).toBe(false);
    expect(feed).toEqual(mockFeeds);
  });
});
