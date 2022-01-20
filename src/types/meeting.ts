type Person = {
  id: number,
  fullName: string,
  rating: number
}

export type Meeting = {
  id: number
  date: string,
  title: string,
  author: string,
  choosingById: string,
  persons: Person[],
}

export type Meetings = Meeting[]