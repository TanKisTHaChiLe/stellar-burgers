import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  userLogout,
  authChecked,
  setUser,
  setLoginUserRequest
} from './userSlice';
import { TLoginData } from '@api';

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return data;
    })
);

export const fetchRegister = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return data;
    })
);

export const fetchLogout = createAsyncThunk(
  'user/logout',
  (_, { dispatch }) => {
    dispatch(setLoginUserRequest(true));
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
      dispatch(setLoginUserRequest(false));
    });
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          dispatch(authChecked());
        });
    } else {
      dispatch(authChecked());
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData, { dispatch }) => {
    dispatch(setLoginUserRequest(true));
    updateUserApi(data)
      .then((data) => dispatch(setUser(data)))
      .finally(() => {
        dispatch(authChecked());
        dispatch(setLoginUserRequest(false));
      });
  }
);
