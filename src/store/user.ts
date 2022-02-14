import { createSlice } from "@reduxjs/toolkit";
import { UserData } from '../types/state';

import { AuthorizationStatus } from '../const';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authorizationStatus: AuthorizationStatus.Unknown
  } as UserData,
  reducers: {

  },
  extraReducers: (builder) => {

  }
})

export default userSlice.reducer