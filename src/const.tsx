
export enum AppRoute {
  Root = '/',
  Login = '/login',
  NextMeeting = '/meeting/next',
  NewForm = '/new-form/',
  AllMeetings = '/meeting/all',
  Meeting = '/meeting/:id',
  Participant = '/participant/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RatingName {
  Controlled = 'CONTROLLED',
  ReadOnly = 'READ_ONLY'
}

export enum ProgressColor {
  Red = '#e55039',
  Yellow = '#f9b300',
  Green = '#2d9761'
}

export const EMOJI = ["📚", "📖", "🤎", "🤍"];
export const COLORS = ["whitesmoke", "#b7b5b5", "lightblue", "lavender"];