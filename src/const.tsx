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