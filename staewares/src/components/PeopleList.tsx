import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Front-end routers
// Components
import SearchBar from './SearchBar';
// types
import { PeopleObj } from '../@types/types';
interface Props {
  filteredPeople: PeopleObj[];
  peopleData: PeopleObj[];
  setFilteredPeople: React.Dispatch<React.SetStateAction<PeopleObj[]>>;
}
// ---------- PeopleList - COMPONENT ---------- //

function PeopleList({ filteredPeople, peopleData, setFilteredPeople }: Props) {
  const navigate = useNavigate();
  return (
    <div>
      <SearchBar peopleData={peopleData} setFilteredPeople={setFilteredPeople} />
      <ul>
        {filteredPeople.length ? (
          filteredPeople.map(({ name, url }: { name: string; url: string }) => (
            <li
              key={url}
              onClick={() => {
                navigate(`/name`);
              }}
            >
              {name}
            </li>
          ))
        ) : (
          <p>No matching results for you, Sorry</p>
        )}
      </ul>
    </div>
  );
}

export default PeopleList;
