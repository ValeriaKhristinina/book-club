export enum AppRoute {
  Root = '/',
  Login = '/login',
  NextMeeting = '/meeting/next',
  NewForm = '/new-form/',
  AllMeetings = '/meeting/all',
  Meeting = '/meeting/:id',
  Member = '/member/:id',
  Members = '/members'
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

export const BOOK_CLUB_BIRTHDAY = '2020/10/5'

export enum ImageUrl {
  DefaultBookCover = '/business-3d-red-opened-book.png',
  StackOfBooks = '/business-3d-stack-of-different-books.png',
  MemberAvatar = '/casual-life-3d-profile-picture-of-man-in-green-shirt-and-orange-hat.png',
  CatOnBooks = '/casual-life-3d-cat-lying-on-books.png'
}

export const EMOJI = ["📚", "📖", "🤎", "🤍"];
export const COLORS = ["whitesmoke", "#b7b5b5", "lightblue", "lavender"];

export const DEFAULT_COVER_URL = ImageUrl.DefaultBookCover