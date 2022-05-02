import moment from "moment";
import { Meeting, MeetingAllInfo } from "../types/meeting";
import { RootState } from "./store"

export const getMeetings = (state: RootState) => state.meetings.meetings;
export const getMembers = (state: RootState) => state.members.members;
export const getSingleMember = (state: RootState) => state.members.singleMember;
export const getMeetingDataLoaded = (state: RootState) => state.meetings.isDataLoaded
export const getMembersDataLoaded = (state: RootState) => state.members.isDataLoaded

export const getMeetingsWithAllInfo = (state: RootState): MeetingAllInfo[] => {
  const meetings = state.meetings.meetings;
  const members = state.members.members;

  const meetingsWithAllInfo = meetings.map((meeting) => {
    const chosenByUser = members.find((user) => user.id === meeting.chosenById)


    const persons = meeting.participants.map((person) => {
      const personWithInfo = members.find((member) => member.id === person.id)
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

export const getCompletedMeetings = (state: RootState) => {
  const meetings = getMeetingsWithAllInfo(state)
  return meetings.filter((item) => item.isComplete === true)
}


export const getNextMeetings = (state: RootState) => {
  const meetings = getMeetingsWithAllInfo(state)
  return meetings.filter((item) => !item.isComplete)
}

export const getLastBook = (state: RootState) => {
  const completedMeetings = getCompletedMeetings(state)

  return completedMeetings[completedMeetings.length - 1]
}

export const getNextMeeting = (state: RootState) => {
  const nextMeetings = getNextMeetings(state)
  if (!nextMeetings.length) return null

  const nextMeeting = nextMeetings.reduce((acc: MeetingAllInfo, currentMeeting: MeetingAllInfo): MeetingAllInfo => {
    if (moment(acc.date).isAfter(currentMeeting.date)) {
      return currentMeeting
    } else {
      return acc
    }
  }, nextMeetings[0])

  return nextMeeting
}

export const getChoosingMember = (state: RootState) => {
  const nextMeeting = getNextMeeting(state)

  const members = state.members.members;
  const memberID = nextMeeting?.chosenById
  return members.find((user) => user.id === memberID)
}

export const getCompletedMeetingsWithAllInfo = (state: RootState): MeetingAllInfo[] => {
  const meetings = getMeetingsWithAllInfo(state)
  return meetings.filter((meeting) => meeting.isComplete === true)
}

export const getAllMemberChoosedBook = (state: RootState) => {
  const meetings = state.meetings.meetings;
  const member = getSingleMember(state)
  const memberChoosedBooks = meetings.filter((book) => book.chosenById === member?.id)

  return memberChoosedBooks

}

export const getAllVisitedMeetings = (participantID: number) => (state: RootState) => {
  const meetings = state.meetings.meetings;
  return meetings.filter((item) => item.participants.find((person) => person.id === participantID))
};

export const getAuthorizationStatus = (state: RootState) => state.user.authorizationStatus

export const getJoinedMembersByDate = (date: string) => (state: RootState) => {
  const members = state.members.members;
  const result = members.filter(person => moment(person.joinDate).isBefore(date))
  return result
}

export const getRatedBooksByMember = (state: RootState) => {
  const meetings = state.meetings.meetings
  const member = getSingleMember(state)

  if (member) {
    const memberRatedBooks: Meeting[] = meetings.filter(meeting => {
      meeting.participants.map(participant => {
        if (participant.id === member.id) {
          return meeting
        }
      })
      return memberRatedBooks
    })
  }
}


export const getRatedBookByMember = (state: RootState) => {
  const meetings = state.meetings.meetings;
  const member = getSingleMember(state)
  const memberRatedBooks = meetings.filter((book) => book.participants.find(participant => participant.id === member?.id && participant.rating))

  return memberRatedBooks

}