import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from './meetings';
import participantReducer from './participants';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    meetings: meetingReducer,
    participants: participantReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch