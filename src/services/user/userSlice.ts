import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchRegister } from './actions';
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setLoginUserRequest: (state, action) => {
      state.loginUserRequest = action.payload;
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

export const { userLogout, authChecked, setUser, setLoginUserRequest } =
  userSlice.actions;

export const { getUserState, isAuthCheckedSelector, getUserSelector } =
  userSlice.selectors;
export default userSlice;
