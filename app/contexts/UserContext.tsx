import React, { useEffect, useState } from 'react';
import { Person } from '~/types/people';

interface IUserContext {
  people: Array<Person>;
  setPeople: (people: Array<Person>) => void;

  selecting: boolean;
  setSelecting: (selecting: boolean) => void;

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
  people: defaultPeople = [],
  selecting: defaultSelecting = false,
}) => {
  const [people, setPeople] = useState<Array<Person>>(defaultPeople);
  const [selecting, setSelecting] = useState<boolean>(defaultSelecting);
  const [selectedPeople, setSelectedPeople] = useState<Array<Person>>([]);

  useEffect(() => {
    setPeople(defaultPeople);
  }, [defaultPeople]);

  return (
    <Context.Provider
      value={{
        people,
        setPeople,

        selecting,
        setSelecting,

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
