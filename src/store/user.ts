import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserData } from '../types/state';
import { AuthorizationStatus } from '../const';
import { checkAuth, login } from "../services/api";
import { deleteToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';



export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async ({ userEmail, userPassword }: AuthData) => {
    const response = await login(userEmail, userPassword);
    saveToken(response.authToken);
    return response.authToken as string;
  }
)

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuthAsync',
  async () => {
    try {
      await checkAuth();
    } catch {
      throw new Error(`No login`)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authorizationStatus: AuthorizationStatus.Unknown
  } as UserData,
  reducers: {
    requireLogout: (state) => {
      deleteToken()
      console.log('alo')
      state.authorizationStatus = AuthorizationStatus.NoAuth
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth
    })
    builder.addCase(checkAuthAsync.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth
    })
    builder.addCase(checkAuthAsync.rejected, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth
    })
  }
})

export const { requireLogout } = userSlice.actions
export default userSlice.reducer
