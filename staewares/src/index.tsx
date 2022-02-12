import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Front-end routers

// Components
import PeopleList from './components/PeopleList';
import PeopleProfile from './components/PeopleProfile';

// types
import { PeopleObj } from './@types/types';

// // Style
// import './style.css';

// ---------- App - COMPONENT ---------- //

function App() {
  // ----- STATES ----- //
  const [peopleData, setPeopleData] = useState<PeopleObj[]>([]); // Give type
  const [filteredPeople, setFilteredPeople] = useState<PeopleObj[]>(peopleData); // Give type

  // ----- EFFECTS ----- //
  // Get all peoples data in the first render
  useEffect(() => {
    getAllPeoples();
  }, []);

  // ----- FUNCTIONS ----- //
  // Get async peoples data from swapi
  const getSTPeople = async (url: string) => {
    try {
      const { data } = await axios.get(url);

      setPeopleData((prevData: any) => [...prevData, ...data.results]);
      setFilteredPeople((prevData: any) => [...prevData, ...data.results]);

      return data.count;
    } catch (error) {
      console.log(error);
    }
  };

  // Get all pages of people data
  const getAllPeoples = async () => {
    // Get first page -> return number of peoples
    const numberOfPeoples = await getSTPeople(`https://swapi.dev/api/people/`);
    // Every request bring 10 peoples -> peopleCount / 10 = number of pages
    const numberOfPages = Math.floor(numberOfPeoples / 10);

    for (let i = 2; i < numberOfPages; i++) {
      await getSTPeople(`https://swapi.dev/api/people/?page=${i}`);
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <PeopleList
                peopleData={peopleData}
                filteredPeople={filteredPeople}
                setFilteredPeople={setFilteredPeople}
              />
            }
          />
          {peopleData.map((data: any) => (
            <Route path={`/:${data.name}`} element={<PeopleProfile profileData={data} />} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);
