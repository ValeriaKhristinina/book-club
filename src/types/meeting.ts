import { Member } from './member'
export type Participant = {
  id: number,
  rating: number,
  isVisited: boolean,
}

export type Meeting = {
  id: number
  date: string,
  title: string,
  author: string,
  cover: {
    url: string
  },
  chosenById: number,
  isComplete: boolean,
  participants: Participant[],
}

export type MeetingAllInfo = Meeting & {
  chosenByUser: Member | undefined,
}


// export type MeetingWithInfo = {
//   ...Meeting,
//   chosenByUser: 
// }

export type Meetings = Meeting[]

export type MeetingBase = {
  // id: number
  date: string,
  title: string,
  author: string,
  chosenById: number,
  isComplete: boolean,
  participants: Participant[],
}