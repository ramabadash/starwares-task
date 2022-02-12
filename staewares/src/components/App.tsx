import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Front-end routers

// Components
import PeopleList from './PeopleList';
import PeopleProfile from './PeopleProfile';

// Context
import ApiContext from '../contexts/ApiContext';

// types
import { PeopleObj } from '../@types/types';

// ---------- App - COMPONENT ---------- //

function App() {
  const { peopleData, filteredPeople, setFilteredPeople } = useContext(ApiContext);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <PeopleList
                peopleData={peopleData!}
                filteredPeople={filteredPeople!}
                setFilteredPeople={setFilteredPeople!}
              />
            }
          />
          <Route path={`/:name`} element={<PeopleProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
