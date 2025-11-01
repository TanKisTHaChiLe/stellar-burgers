import { expect, describe, jest } from '@jest/globals';

const mockLocalStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
};

const mockCookie = {
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn()
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

jest.mock('../../utils/cookie', () => mockCookie);

import { fetchLogin, fetchRegister } from './actions';
import * as api from '@api';
import store from '../store';
import {
  getUserState,
  isAuthCheckedSelector,
  getUserSelector
} from './userSlice';

const mockResponse = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTU1NmQ4NjczMDg2MDAxYmE4YzY5MyIsImlhdCI6MTc2MjAzMDI0MywiZXhwIjoxNzYyMDMxNDQzfQ.YMfKH0mRYo1NhttbSeAnylTXmh4lcSkGEUkfHK_2kTs',
  refreshToken:
    'd6dd71deba5ec12ea4c24fbd94d22aba1781da269556783712c6408ee40bfc75713c41ecf1a7afae',
  user: {
    email: 'laanetsan@gmadil.com',
    name: 'Артём'
  }
};

const mockLoginData = {
  email: 'laanetsan@gmadil.com',
  password: '7H2-5Xh-GyH-E5h'
};

const mockRegisterData = {
  name: 'Артём',
  email: 'laanetsan@gmadil.com',
  password: '7H2-5Xh-GyH-E5h'
};

const mockUserData = {
  name: 'Артём',
  email: 'laanetsan@gmadil.com'
};

describe('Тестирование userSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Тестирование экшена fetchLogin', () => {
    it('Если экшен fetchLogin в состоянии pending, то isloading: true', () => {
      const login = jest
        .spyOn(api, 'loginUserApi')
        .mockReturnValue(new Promise(() => {}));

      store.dispatch(fetchLogin(mockLoginData));

      const loginUserRequest = getUserState(store.getState()).loginUserRequest;

      expect(loginUserRequest).toBe(true);
    });

    it('Если экшен fetchLogin в состоянии rejected, ошибка зписывается в стор, isloading: false и isAuthChecked: true', async () => {
      const errorMessage = 'error';
      const login = jest
        .spyOn(api, 'loginUserApi')
        .mockRejectedValue(errorMessage);

      await store.dispatch(fetchLogin(mockLoginData));

      const loginUserRequest = getUserState(store.getState()).loginUserRequest;
      const isAuthChecked = isAuthCheckedSelector(store.getState());
      const loginUserError = getUserState(store.getState()).loginUserError;

      expect(loginUserError).toBe(errorMessage);
      expect(loginUserRequest).toBe(false);
      expect(isAuthChecked).toBe(true);
    });

    it('Если экшен fetchLogin в состоянии fulfilled, то isLoading: false, isAuthChecked: true, isAuthenticated: true и данные записываются в стор', async () => {
      const login = jest
        .spyOn(api, 'loginUserApi')
        .mockResolvedValue(mockResponse);

      await store.dispatch(fetchLogin(mockLoginData));

      const loginUserRequest = getUserState(store.getState()).loginUserRequest;
      const isAuthChecked = isAuthCheckedSelector(store.getState());
      const isAuthenticated = getUserState(store.getState()).isAuthenticated;
      const user = getUserSelector(store.getState());

      expect(loginUserRequest).toBe(false);
      expect(isAuthChecked).toBe(true);
      expect(user).toEqual(mockUserData);
      expect(isAuthenticated).toBe(true);
    });
  });

  describe('Тестирование экшена fetchRegister', () => {
    it('Если экшен fetchRegister в состоянии pending, то isloading: true', () => {
      const login = jest
        .spyOn(api, 'registerUserApi')
        .mockReturnValue(new Promise(() => {}));

      store.dispatch(fetchRegister(mockRegisterData));

      const loginUserRequest = getUserState(store.getState()).loginUserRequest;

      expect(loginUserRequest).toBe(true);
    });

    it('Если экшен fetchRegister в состоянии rejected, ошибка зписывается в стор, isloading: false и isAuthChecked: true', async () => {
      const errorMessage = 'error';
      const login = jest
        .spyOn(api, 'registerUserApi')
        .mockRejectedValue(errorMessage);

      await store.dispatch(fetchRegister(mockRegisterData));

      const loginUserRequest = getUserState(store.getState()).loginUserRequest;
      const isAuthChecked = isAuthCheckedSelector(store.getState());
      const loginUserError = getUserState(store.getState()).loginUserError;

      expect(loginUserError).toBe(errorMessage);
      expect(loginUserRequest).toBe(false);
      expect(isAuthChecked).toBe(true);
    });

    it('Если экшен fetchRegister в состоянии fulfilled, то isLoading: false, isAuthChecked: true, isAuthenticated: true и данные записываются в стор', async () => {
      const login = jest
        .spyOn(api, 'registerUserApi')
        .mockResolvedValue(mockResponse);

      await store.dispatch(fetchRegister(mockRegisterData));

      const loginUserRequest = getUserState(store.getState()).loginUserRequest;
      const isAuthChecked = isAuthCheckedSelector(store.getState());
      const isAuthenticated = getUserState(store.getState()).isAuthenticated;
      const user = getUserSelector(store.getState());

      expect(loginUserRequest).toBe(false);
      expect(isAuthChecked).toBe(true);
      expect(user).toEqual(mockUserData);
      expect(isAuthenticated).toBe(true);
    });
  });
});
