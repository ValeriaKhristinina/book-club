import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from './meetings';
import participantReducer from './participants';

export const store = configureStore({
  reducer: {
    meetings: meetingReducer,
    participants: participantReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch