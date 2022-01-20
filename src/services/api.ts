const BACKAND_URL= 'http://localhost:3004';

export const fetchMeetings = () => 
fetch(BACKAND_URL + '/meetings')
  .then((response) => response.json())


export const fetchParticipants = () => fetch(BACKAND_URL + '/participants')
  .then((response) => response.json())

export const fetchParticipantById = (id: number) => fetch(`${BACKAND_URL}/participants/${id}`)
  .then((response) => response.json())
