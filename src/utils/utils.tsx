import { Meeting } from '../types/meeting';
import { Participant } from '../types/participant';

export const createPersonsArray = (persons: Participant[]): string[] => {
  let newArray = persons.map(item => {
    const fullName = item.firstName + " " + item.lastName;
    return fullName
  })
  return newArray;
}

export const createNewQueque = (choosingPerson: Participant, persons: Participant[]): Participant[] => {
  let newQueque: Participant[] = []
  const findPersonInArray = persons.find((person) => person.id === choosingPerson.id)
  if (findPersonInArray) {
    const indexChoosingPerson = persons.indexOf(findPersonInArray);
    const firstCutArray = persons.slice(indexChoosingPerson + 1)
    const secondCutArray = persons.slice(0, indexChoosingPerson)
    newQueque = firstCutArray.concat(secondCutArray);
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