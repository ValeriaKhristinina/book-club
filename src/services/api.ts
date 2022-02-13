import { Meeting, MeetingBase } from "../types/meeting";
import { ParticipantBase } from "../types/participant";

const BACKAND_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:uSSlIyia';

const BACKAND_URL_MEETINGS = BACKAND_URL + '/meetings'
const BACKAND_URL_PARTICIPANTS = BACKAND_URL + '/participants'

export const fetchMeetings = () =>
  fetch(BACKAND_URL_MEETINGS)
    .then((response) => response.json())


export const fetchParticipants = () => fetch(BACKAND_URL_PARTICIPANTS)
  .then((response) => response.json())

export const fetchParticipantById = (id: number) => fetch(`${BACKAND_URL_PARTICIPANTS}/${id}`)
  .then((response) => response.json())


export const createNewMeeting = (meeting: MeetingBase) => fetch(BACKAND_URL_MEETINGS, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(meeting)
})
  .then(response => response.json())

export const createNewParticipant = (participant: ParticipantBase) => fetch(BACKAND_URL_PARTICIPANTS, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(participant)
})
  .then(response => response.json())


export const deleteMeeting = (meetingID: number) => fetch(`${BACKAND_URL_MEETINGS}/${meetingID}`, {
  method: 'DELETE'
})
  .then(response => response.json())

export const completeMeeting = (meeting: Meeting) => fetch(`${BACKAND_URL_MEETINGS}/${meeting.id}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...meeting,
    meetings_id: meeting.id
  })
})
  .then((response) => response.json())


