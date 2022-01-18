import { Participant } from '../types/participant';


// From object all participants make array of FullNames strings
export const createPersonsArray = (persons: Participant[]): string[] => {
  let newArray = persons.map(item => {
    const fullName = item.firstName + " " + item.lastName;
    return fullName
  })
  return newArray;
}

export const createNewQueque = (choosingPerson: Participant, personsArray: string[]): string[] => {
  const fullName = choosingPerson.firstName + " " + choosingPerson.lastName
  const indexOfPerson = personsArray.indexOf(fullName)
  const firstCutArray = personsArray.slice(indexOfPerson + 1)
  const secondCutArray = personsArray.slice(0, indexOfPerson)
  return firstCutArray.concat(secondCutArray);
}