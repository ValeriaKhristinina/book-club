import moment from "moment";
import { Meeting } from "../types/meeting";
import { RootState } from "./store"

export const getMeetings = (state: RootState) => state.meetings.meetings;
export const getParticipants = (state: RootState) => state.participants.participants;
export const getSingleParticipant = (state: RootState) => state.participants.singleParticipant;
export const getMeetingDataLoaded = (state: RootState) => state.meetings.isDataLoaded
export const getParticipantsDataLoaded = (state: RootState) => state.participants.isDataLoaded

export const getCompletedMeetings = (state: RootState) => {
  const meetings = state.meetings.meetings;
  return meetings.filter((item) => item.isComplete === true)
}

export const getNextMeetings = (state: RootState) => {
  const meetings = state.meetings.meetings;
  return meetings.filter((item) => item.isComplete === false)
}

export const getLastBook = (state: RootState) => {
  const completedMeetings = getCompletedMeetings(state)

  return completedMeetings[completedMeetings.length - 1]
}

export const getNextMeeting = (state: RootState) => {
  const nextMeetings = getNextMeetings(state)
  if (!nextMeetings.length) return null

  const nextMeeting = nextMeetings.reduce((acc: Meeting, currentMeeting: Meeting): Meeting => {
    if (moment(acc.date).isAfter(currentMeeting.date)) {
      return currentMeeting
    } else {
      return acc
    }
  }, nextMeetings[0])

  return nextMeeting
}

export const getChoosingParticipant = (state: RootState) => {
  const nextMeeting = getNextMeeting(state)

  const participants = state.participants.participants;
  const participantID = nextMeeting?.chosenById
  return participants.find((user) => user.id === participantID)
}

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
  return meetingsWithAllInfo;
}

export const getCompletedMeetingsWithAllInfo = (state: RootState) => {
  const meetings = getMeetingsWithAllInfo(state)
  return meetings.filter((meeting) => meeting.isComplete === true)
}

export const getAllParticipantChoosedBook = (state: RootState) => {
  const meetings = state.meetings.meetings;
  const participant = getSingleParticipant(state)
  const participantChoosedBooks = meetings.filter((book) => book.chosenById === participant?.id)

  return participantChoosedBooks

}

export const getAllVisitedMeetings = (participantID: number) => (state: RootState) => {
  const meetings = state.meetings.meetings;
  return meetings.filter((item) => item.persons.find((person) => person.id === participantID))
};

export const getAuthorizationStatus = (state: RootState) => state.user.authorizationStatus