// import {AppState} from '../types/state';
import {fetchMeetings} from '../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MeetingsData } from '../types/state';
import { Meeting } from '../types/meeting';

export const getMeetingsAsync = createAsyncThunk(
	'meetings/getMeetingsAsync',
	async () => {
		const response = await fetchMeetings();
		return response as Meeting[]
	}
);

export const meetingsSlice = createSlice({
	name: 'meetings',
	initialState: {
		isDataLoaded: false,
		meetings: []
	} as MeetingsData,
	reducers: {
	},
	extraReducers: (builder) => {
    builder.addCase(getMeetingsAsync.fulfilled, (state, action) => {
      state.meetings = action.payload
			state.isDataLoaded = true
    })
  },
});

export default meetingsSlice.reducer;