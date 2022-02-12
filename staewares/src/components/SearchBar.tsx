import React, { useRef, useState } from 'react';
// Style
import '../styles/SearchBar.css';

// ---------- SearchBar - COMPONENT ---------- //

// TODO - PROPS TYPE
function SearchBar({ peopleData, setFilteredPeople }: any) {
  // ----- STATES ----- //
  const [query, setQuery] = useState<string>('');

  // ----- REFS ----- //
  const serachInputRef = useRef<HTMLInputElement | null>(null);

  // ----- FUNCTIONS ----- //
  const handleInputChange = (query: string): void => {
    setQuery(query); // Set query state

    // Filter caseinsensitive
    setFilteredPeople(
      peopleData.filter(({ name }: { name: string }) =>
        name.toLowerCase().includes(query.toLowerCase() as string)
      )
    );
  };

  return (
    <div>
      <input
        ref={serachInputRef}
        value={query}
        placeholder='Write your favorate name here'
        onChange={e => handleInputChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
