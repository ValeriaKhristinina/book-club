import { Meeting } from "./meeting";
import { Participant } from "./participant";

export type MeetingsData = {
  meetings: Meeting[],
}

export type ParticipantsData = {
  participants: Participant[],
}