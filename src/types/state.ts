import { AuthorizationStatus } from "../const";
import { Meeting } from "./meeting";
import { Member } from "./member";

export type MeetingsData = {
  isDataLoaded: boolean,
  meetings: Meeting[],
}

export type MembersData = {
  isDataLoaded: boolean,
  members: Member[],
  singleMember: Member | null,
}

export type UserData = {
  authorizationStatus: AuthorizationStatus,
}