import { Participant } from './participant'
type Person = {
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
  persons: Person[],
}

export type MeetingAllInfo = Meeting & {
  chosenByUser: Participant | undefined,
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
  persons: Person[],
}