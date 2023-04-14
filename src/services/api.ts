import { Meeting, MeetingBase } from '../types/meeting';
import { MemberBase } from '../types/member';
import { getToken } from './token';

// Testing Backend
// const BACKAND_URL = 'http://localhost:3004'

//Prodd backend
const BACKAND_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:uSSlIyia';

const BACKAND_URL_MEETINGS = BACKAND_URL + '/meetings';
const BACKAND_URL_MEMBERS = BACKAND_URL + '/members';
const BACKAND_URL_LOGIN = BACKAND_URL + '/auth/login';

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchMeetings = () =>
  fetch(BACKAND_URL_MEETINGS)
    .then(handleErrors)
    .then((response) => response.json());

export const fetchMeetingById = (id: number) =>
  fetch(`${BACKAND_URL_MEETINGS}/${id}`)
    .then(handleErrors)
    .then((response) => response.json());

export const fetchMembers = () =>
  fetch(BACKAND_URL_MEMBERS)
    .then(handleErrors)
    .then((response) => response.json());

export const fetchMemberById = (id: number) =>
  fetch(`${BACKAND_URL_MEMBERS}/${id}`)
    .then(handleErrors)
    .then((response) => response.json());

export const createNewMeeting = (meeting: MeetingBase) =>
  fetch(BACKAND_URL_MEETINGS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meeting)
  })
    .then(handleErrors)
    .then((response) => response.json());

export const createNewMember = (member: MemberBase) =>
  fetch(BACKAND_URL_MEMBERS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  })
    .then(handleErrors)
    .then((response) => response.json());

export const deleteMeeting = (meetingID: number) =>
  fetch(`${BACKAND_URL_MEETINGS}/${meetingID}`, {
    method: 'DELETE'
  })
    .then(handleErrors)
    .then((response) => response.json());

export const completeMeeting = (meeting: Meeting) =>
  fetch(`${BACKAND_URL_MEETINGS}/${meeting.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...meeting,
      meetings_id: meeting.id
    })
  })
    .then(handleErrors)
    .then((response) => response.json());

export const changeMeeting = (meeting: Meeting) =>
  fetch(`${BACKAND_URL_MEETINGS}/${meeting.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meeting)
  })
    .then(handleErrors)
    .then((response) => response.json());

export const login = (userEmail: string, userPassword: string) =>
  fetch(BACKAND_URL_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    })
  })
    .then(handleErrors)
    .then((response) => response.json());

export const checkAuth = () =>
  fetch(BACKAND_URL + '/auth/me', {
    method: 'GET',
    headers: { Authorization: getToken() }
  })
    .then(handleErrors)
    .then((response) => response.json());
