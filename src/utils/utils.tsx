import moment from 'moment';
import { ProgressColor } from '../const';
import { Meeting } from '../types/meeting';
import { Participant } from '../types/participant';

type VisitingStructure = {
  [key: number]: number
}

export const createPersonsArray = (persons: Participant[]): string[] => {
  let newArray = persons.map(item => {
    const fullName = item.firstName + " " + item.lastName;
    return fullName
  })
  return newArray;
}

export const checkVisitingParticipants = (meetings: Meeting[], participants: Participant[]): VisitingStructure => {
  let newObj: VisitingStructure = {}
  meetings.map((item) => {
    if (!item.persons) {
      return false
    }
    item.persons.map((person) => {
      if (!person.isVisited) {
        return false
      }
      if (typeof newObj[person.id] !== "undefined") {
        newObj[person.id] += 1
      } else {
        newObj[person.id] = 1;
      }
      return true
    })
    return true;
  })
  return newObj;
}

export const createNewQueque = (choosingPerson: Participant | undefined, persons: Participant[], visitingParticipants: VisitingStructure): Participant[] => {
  let newQueque: Participant[] = []

  if (!choosingPerson) {
    return []
  }

  const findPersonInArray = persons.find((person) => person.id === choosingPerson.id)
  if (findPersonInArray) {
    const indexChoosingPerson = persons.indexOf(findPersonInArray);
    const firstCutArray = persons.slice(indexChoosingPerson + 1)
    const secondCutArray = persons.slice(0, indexChoosingPerson)
    const newArr = firstCutArray.concat(secondCutArray)

    newQueque = newArr.filter((participant) => visitingParticipants[participant.id] >= 2)
  }
  return newQueque;
}

export const calculateAverageRating = (lastBook: Meeting): number => {
  if (!lastBook.persons) {
    return 0
  }
  const votingPersons = lastBook.persons.filter(rating => rating.rating !== null)
  const result = votingPersons.reduce((sum, current) => sum + current.rating, 0);
  const averageValue = Math.round((result / votingPersons.length) * 100) / 100
  return averageValue
}

export const widthRating = (rating: number): string => `${(100 * rating) / 5.0}`;

export const formatDate = (date: string | undefined): string => {
  if (!date) {
    return ''
  }
  return moment(date).format("D MMMM YYYY");
}

export const getRandomElement = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
}

export const visitingProgress = (visitingPersons: number, allPersons: number): number => Math.round(((10 * visitingPersons) / allPersons) * 10)

export const checkProgressColor = (progress: number): string => {
  if (progress <= 30) {
    return ProgressColor.Red
  } else if (progress > 30 && progress <= 60) {
    return ProgressColor.Yellow
  } else if (progress > 60 && progress <= 100) {
    return ProgressColor.Green
  } else {
    return 'invalid percentage'
  }
}