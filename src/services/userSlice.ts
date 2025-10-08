import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData
} from '@api';
import { TLoginData, TAuthResponse } from '@api';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

interface loginUser {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserRequest: boolean;
  loginUserError: string | null;
}

const initialState: loginUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserRequest: false,
  loginUserError: null
};

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return data;
    })
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUserState: (state) => state,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUserSelector: (state) => state.user
  },
  extraReducers: (build) => {
    build
      .addCase(fetchLogin.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || null;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.user = action.payload.user || null;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })

      .addCase(fetchRegister.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || null;
        state.isAuthChecked = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.user = action.payload.user || null;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      });
  }
});

export const { userLogout, authChecked, setUser } = userSlice.actions;

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
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    });
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user)))
        .finally(() => {
          dispatch(authChecked());
        });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { getUserState, isAuthCheckedSelector, getUserSelector } =
  userSlice.selectors;
export default userSlice;
