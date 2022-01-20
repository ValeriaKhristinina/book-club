import { Meeting } from "./meeting";
import { Participant } from "./participant";

export type MeetingsData = {
  isDataLoaded: boolean,
  meetings: Meeting[],
}

export type ParticipantsData = {
  isDataLoaded: boolean,
  participants: Participant[],
  singleParticipant: Participant | null,
}