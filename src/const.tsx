import { Participant } from "./types/participant";

export enum AppRoute {
  Root = '/',
  NewMeeting = '/new-meeting',
  NextMeeting = '/next-meeting',
  Participant = '/participant/:id'
}

export const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    firstName: 'Lera',
    lastName: 'Khristinina',
    joinDate: '2020-10-05',
  },
  {
    id: 2,
    firstName: 'Nikita',
    lastName: 'Khristinin',
    joinDate: '2020-10-05',
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Tarabukina',
    joinDate: '2020-10-05',
  },
  {
    id: 4,
    firstName: 'Ekaterina',
    lastName: 'Tarasevich',
    joinDate: '2020-10-05',
  },
  {
    id: 5,
    firstName: 'Maria',
    lastName: 'Urusova',
    joinDate: '2020-12-05',
  },
]