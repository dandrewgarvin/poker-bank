import React from 'react';
import { Person } from '~/types/people';

interface IUserContext {
  people: Array<Person>;
}

const Context = React.createContext<IUserContext | null>(null);

const useUsers = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error('Unable to use UserContext outside of Provider');
  }

  return context;
};

const UserContext: React.FC<Partial<IUserContext>> = ({ children, people }) => {
  return (
    <Context.Provider value={{ people: people ?? [] }}>
      {children}
    </Context.Provider>
  );
};

export default UserContext;
export { useUsers };
