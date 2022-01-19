import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchParticipants } from "../services/api";
import { Participant } from "../types/participant";
import { ParticipantsData } from "../types/state";

export const getParticipantsAsync = createAsyncThunk(
	'participants/getParticipantsAsync',
	async () => {
		const response = await fetchParticipants();
		return response as Participant[]
	}
);

export const participantsSlice = createSlice({
	name: 'participants',
	initialState: {
		isDataLoaded: false,
		participants: []
	} as ParticipantsData,
	reducers: {
	},
	extraReducers: (builder) => {
    builder.addCase(getParticipantsAsync.fulfilled, (state, action) => {
      state.participants = action.payload
			state.isDataLoaded = true
    })
  },
});

export default participantsSlice.reducer