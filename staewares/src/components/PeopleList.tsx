import React from 'react';
import { useNavigate } from 'react-router-dom'; // Front-end routers
// Components
import SearchBar from './SearchBar';
// Style
import '../styles/PeopleList.css';
// types
import { PeopleObj } from '../@types/types';
interface Props {
  filteredPeople: PeopleObj[];
  peopleData: PeopleObj[];
  setFilteredPeople: React.Dispatch<React.SetStateAction<PeopleObj[]>>;
}

// ---------- PeopleList - COMPONENT ---------- //

function PeopleList({ filteredPeople, peopleData, setFilteredPeople }: Props) {
  // ----- FUNCTIONS ----- //
  const navigate = useNavigate();

  return (
    <div>
      <SearchBar peopleData={peopleData} setFilteredPeople={setFilteredPeople} />
      <ul className='people-list'>
        {filteredPeople.length ? (
          filteredPeople.map(({ name, url }: { name: string; url: string }) => (
            <li
              key={url}
              onClick={() => {
                navigate(`/${name}`);
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
