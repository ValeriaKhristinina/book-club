import { Participant } from "./types/participant";
import { createNewQueque, createPersonsArray } from "./utils/utils";

export enum AppRoute {
  Root = '/',
  NewMeeting = '/new-meeting',
  Meeting = '/meeting',
  Book = '/book/:id'
}

export const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    firstName: 'Lera',
    lastName: 'Khristinina',
    joinDate: '2020-10-05',
    countOfChoosingBook: 2,
    countOfMeeting: 10,
  },
  {
    id: 2,
    firstName: 'Nikita',
    lastName: 'Khristinin',
    joinDate: '2020-10-05',
    countOfChoosingBook: 2,
    countOfMeeting: 10,
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Tarabukina',
    joinDate: '2020-10-05',
    countOfChoosingBook: 2,
    countOfMeeting: 10,
  },
  {
    id: 4,
    firstName: 'Ekaterina',
    lastName: 'Tarasevich',
    joinDate: '2020-10-05',
    countOfChoosingBook: 2,
    countOfMeeting: 10,
  },
  {
    id: 5,
    firstName: 'Maria',
    lastName: 'Urusova',
    joinDate: '2020-12-05',
    countOfChoosingBook: 2,
    countOfMeeting: 8,
  },
]

export const personsArray = createPersonsArray(PARTICIPANTS);

export const choosingPerson = PARTICIPANTS[4]

export const newQueque = createNewQueque(choosingPerson, personsArray);
