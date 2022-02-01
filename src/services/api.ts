import { MeetingBase } from "../types/meeting";

const BACKAND_URL = 'http://localhost:3004';

export const fetchMeetings = () =>
  fetch(BACKAND_URL + '/meetings')
    .then((response) => response.json())


export const fetchParticipants = () => fetch(BACKAND_URL + '/participants')
  .then((response) => response.json())

export const fetchParticipantById = (id: number) => fetch(`${BACKAND_URL}/participants/${id}`)
  .then((response) => response.json())


export const createNewMeeting = (meeting: MeetingBase) => fetch(`${BACKAND_URL}/meetings`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(meeting)
})
  .then(response => response.json())
