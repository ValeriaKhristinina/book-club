export type Participant = {
  id: number,
  firstName: string,
  lastName: string,
  joinDate: string,
  exitDate: string,
}

export type ParticipantBase = {
  firstName: string,
  lastName: string,
  joinDate: string,
  exitDate: string | null,
}