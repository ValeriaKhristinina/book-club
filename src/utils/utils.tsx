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
    item.persons.map((person) => {
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

export const createNewQueque = (choosingPerson: Participant, persons: Participant[], visitingParticipants: VisitingStructure): Participant[] => {
  let newQueque: Participant[] = []
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
  const votingPersons = lastBook.persons.filter(rating => rating.rating !== null)
  const result = votingPersons.reduce((sum, current) => sum + current.rating, 0);
  const averageValue = result / votingPersons.length
  return averageValue
}

export const findPersonById = () => {

}