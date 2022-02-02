import { MeetingBase } from "../types/meeting";

const BACKAND_URL = 'http://localhost:3004';

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


export const deleteMeeting = (meetingID: number) => fetch(`${BACKAND_URL_MEETINGS}/${meetingID}`, {
  method: 'DELETE'
})
  .then(response => response.json())
