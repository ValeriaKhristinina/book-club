import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewMember, fetchMemberById, fetchMembers } from "../services/api";
import { Member, MemberBase } from "../types/member";
import { MembersData } from "../types/state";

export const getMembersAsync = createAsyncThunk(
	'members/getMembersAsync',
	async () => {
		const response = await fetchMembers();
		return response as Member[]
	}
);

export const getMemberByIdAsync = createAsyncThunk(
	'members/getParticipantByIdAsync',
	async (id: number) => {
		const response = await fetchMemberById(id);
		return response as Member
	}
);

export const createNewMemberAsync = createAsyncThunk(
	'members/createNewMemberAsync',
	async (member: MemberBase) => {
		const response = await createNewMember(member)
		return response as MemberBase
	}
)

export const membersSlice = createSlice({
	name: 'members',
	initialState: {
		isDataLoaded: false,
		members: [],
		singleMember: null,
	} as MembersData,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getMembersAsync.fulfilled, (state, action) => {
			state.members = action.payload
			state.isDataLoaded = true
		});
		builder.addCase(getMemberByIdAsync.fulfilled, (state, action) => {
			state.singleMember = action.payload
		})
	},
});

export default membersSlice.reducer