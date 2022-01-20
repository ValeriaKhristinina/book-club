import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchParticipantById, fetchParticipants } from "../services/api";
import { Participant } from "../types/participant";
import { ParticipantsData } from "../types/state";

export const getParticipantsAsync = createAsyncThunk(
	'participants/getParticipantsAsync',
	async () => {
		const response = await fetchParticipants();
		return response as Participant[]
	}
);

export const getParticipantByIdAsync = createAsyncThunk(
	'participants/getParticipantByIdAsync',
	async (id: number) => {
		const response = await fetchParticipantById(id);
		return response as Participant
	}
);

export const participantsSlice = createSlice({
	name: 'participants',
	initialState: {
		isDataLoaded: false,
		participants: [],
		singleParticipant: null,
	} as ParticipantsData,
	reducers: {
	},
	extraReducers: (builder) => {
    builder.addCase(getParticipantsAsync.fulfilled, (state, action) => {
      state.participants = action.payload
			state.isDataLoaded = true
    });
		builder.addCase(getParticipantByIdAsync.fulfilled, (state, action) => {
      state.singleParticipant = action.payload
    })
  },
});

export default participantsSlice.reducer