import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import meetingReducer from './meetings';
import memberReducer from './members';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    meetings: meetingReducer,
    members: memberReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()