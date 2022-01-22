import { RootState } from "./store"

export const getMeetings = (state: RootState) => state.meetings.meetings;
export const getParticipants = (state: RootState) => state.participants.participants;
export const getSingleParticipant = (state: RootState) => state.participants.singleParticipant;

export const getMeetingDataLoaded = (state: RootState) => state.meetings.isDataLoaded
export const getParticipantsDataLoaded = (state: RootState) => state.participants.isDataLoaded



export const getMeetingsWithAllInfo = (state: RootState) => {
  const meetings = state.meetings.meetings;
  const participants = state.participants.participants;

  const meetingsWithAllInfo = meetings.map((meeting) => {
    const chosenByUser = participants.find((user) => user.id === meeting.chosenById)


    const persons = meeting.persons.map((person) => {
      const personWithInfo = participants.find((participant) => participant.id === person.id)
      return {
        ...person,
        ...personWithInfo
      }
    })

    return {
      ...meeting,
      chosenByUser,
      persons
    }
  })

  console.log(meetingsWithAllInfo)
  return meetingsWithAllInfo;
}