import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Context
import ApiContext from './ApiContext';
// Types
import { PeopleObj } from '../@types/types';

function ApiProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  // ----- STATES ----- //
  const [peopleData, setPeopleData] = useState<PeopleObj[]>([]); // Array of people objects
  const [filteredPeople, setFilteredPeople] = useState<PeopleObj[]>(peopleData); // Array of people objects filtered by search

  // ----- EFFECTS ----- //
  // Get all peoples data in the first render
  useEffect(() => {
    getAllPeoples();
  }, []);

  // ----- FUNCTIONS ----- //
  // Get async peoples data from swapi return number of pages
  const getNumberOfPeople = async (url: string) => {
    try {
      const { data } = await axios.get(url);
      return data.count;
    } catch (error) {
      console.log(error);
    }
  };

  // Get all pages of people data
  const getAllPeoples = async () => {
    const peoplesArray: PeopleObj[] = [];

    // Get first page -> return number of peoples
    const numberOfPeoples = await getNumberOfPeople(`https://swapi.dev/api/people/`);

    // Every request bring 10 peoples -> peopleCount / 10 = number of pages
    const numberOfPages = Math.floor(numberOfPeoples / 10);

    for (let i = 1; i < numberOfPages; i++) {
      const { data } = await axios.get(`https://swapi.dev/api/people/?page=${i}`);
      peoplesArray.push(...data.results);
    }

    setPeopleData((prevData: any) => [...prevData, ...peoplesArray]);
    setFilteredPeople((prevData: any) => [...prevData, ...peoplesArray]);
  };

  return (
    <ApiContext.Provider value={{ peopleData, filteredPeople, setFilteredPeople }}>
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
