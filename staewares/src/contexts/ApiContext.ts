import { createContext } from 'react';
// types
import { PeopleObj } from '../@types/types';

interface ApiContext {
  peopleData?: PeopleObj[];
  filteredPeople?: PeopleObj[];
  setFilteredPeople?: React.Dispatch<React.SetStateAction<PeopleObj[]>>;
}
const ApiContext = createContext<ApiContext>({});

export default ApiContext;
