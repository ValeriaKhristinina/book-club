import {
  fetchMeetings,
  createNewMeeting,
  deleteMeeting,
  completeMeeting,
  fetchMeetingById,
  changeMeeting
} from '../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MeetingsData } from '../types/state';
import { Meeting, MeetingBase } from '../types/meeting';

export const getMeetingsAsync = createAsyncThunk(
  'meetings/getMeetingsAsync',
  async () => {
    const response = await fetchMeetings();
    return response as Meeting[];
  }
);

export const getMeetingByIdAsync = createAsyncThunk(
  'meetings/getMeetingByIdAsync',
  async (id: number) => {
    const response = await fetchMeetingById(id);
    return response as Meeting;
  }
);

export const createNewMeetingAsync = createAsyncThunk(
  'meetings/createNewMeetingAsync',
  async (meeting: MeetingBase) => {
    const response = await createNewMeeting(meeting);
    return response as Meeting;
  }
);

export const deleteMeetingAsync = createAsyncThunk(
  'meetings/deleteMeetingAsync',
  async (meetingID: number) => {
    await deleteMeeting(meetingID);
    return meetingID;
  }
);

export const completeMeetingAsync = createAsyncThunk(
  'meetings/completeMeetingAsync',
  async (meeting: Meeting) => {
    const response = await completeMeeting(meeting);
    return response as Meeting;
  }
);

export const changeMeetingAsync = createAsyncThunk(
  'meetings/changeMeetingAsync',
  async (meeting: Meeting) => {
    const response = await changeMeeting(meeting);
    return response as Meeting;
  }
);

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState: {
    isDataLoaded: false,
    meetings: [],
    singleMeeting: null
  } as MeetingsData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMeetingsAsync.fulfilled, (state, action) => {
      state.meetings = action.payload;
      state.isDataLoaded = true;
    });
    builder.addCase(getMeetingByIdAsync.fulfilled, (state, action) => {
      state.singleMeeting = action.payload;
    });
    builder.addCase(createNewMeetingAsync.fulfilled, (state, action) => {
      state.meetings.push(action.payload);
    });
    builder.addCase(deleteMeetingAsync.fulfilled, (state, action) => {
      state.meetings = state.meetings.filter(
        (meeting) => meeting.id !== action.payload
      );
    });
    builder.addCase(completeMeetingAsync.fulfilled, (state, action) => {
      state.meetings.push(action.payload);
    });
		builder.addCase(changeMeetingAsync.fulfilled, (state, action) => {
      state.meetings.push(action.payload);
    });
  }
});

export default meetingsSlice.reducer;
