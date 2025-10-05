import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi, loginUserApi, logoutApi } from '@api';
import { TLoginData, TAuthResponse } from '@api';
import { deleteCookie, getCookie } from '../utils/cookie';

interface loginUser {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TAuthResponse | null;
  loginUserRequest: boolean;
  loginUserError: string | null;
}

const initialState: loginUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserRequest: false,
  loginUserError: null
};

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    getUserState: (state) => state,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userDataSelector: (state) => state.data
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
        state.data = action.payload || null;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      });
  }
});

export const { userLogout, authChecked } = userSlice.actions;

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
      getUserApi().finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { getUserState, isAuthCheckedSelector, userDataSelector } =
  userSlice.selectors;
export default userSlice;
