export type Member = {
  id: number,
  firstName: string,
  lastName: string,
  joinDate: string,
  exitDate: string,
}

export type MemberBase = {
  firstName: string,
  lastName: string,
  joinDate: string,
  exitDate: string | null,
}