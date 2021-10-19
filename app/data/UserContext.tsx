import React, { useState } from 'react';
import { Person } from '~/types/people';

interface IUserContext {
  people: Array<Person>;
  selecting: boolean;
  selectedPeople?: Array<Person>;
  setSelectedPeople(people: Array<Person>): void;
}

const Context = React.createContext<IUserContext | null>(null);

const useUsers = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error('Unable to use UserContext outside of Provider');
  }

  return context;
};

const UserContext: React.FC<Partial<IUserContext>> = ({
  children,
  people,
  selecting = false,
}) => {
  const [selectedPeople, setSelectedPeople] = useState<Array<Person>>([]);
  return (
    <Context.Provider
      value={{
        people: people ?? [],
        selecting: selecting,
        selectedPeople,
        setSelectedPeople,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default UserContext;
export { useUsers };
