import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import type { Person } from '~/types/people';
import type { Route } from '~/components/NavBar';

import navigation from '~/config/navigation';

import { useUsers } from '~/contexts/UserContext';

import Header from '~/components/Header';

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

interface IMainLayout {
  handleDistribute?: (selectedPeople: Array<Person>) => void;
}

const MainLayout: React.FC<IMainLayout> = ({ children, handleDistribute }) => {
  const { setSelecting: setUsersSelecting } = useUsers();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const [activeRoute, setActiveRoute] = useState<Route>(navigation[0]);
  const [selecting, setSelecting] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Array<Person>>([]);

  useEffect(() => {
    const isSelecting = queryParams.get('selecting');

    if (isSelecting !== null) {
      setSelecting(false);
      setSelectedPeople([]);
      navigate('/');
    }
  }, [location.search]);

  useEffect(() => {
    setUsersSelecting(selecting);
  }, [selecting]);

  return (
    <React.Fragment>
      <Header
        routes={navigation}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        selecting={selecting}
        setSelecting={setSelecting}
        handleDistribute={() => handleDistribute?.(selectedPeople)}
      />
      <Body handleSelectedPeople={setSelectedPeople}>{children}</Body>
    </React.Fragment>
  );
};

interface IBody {
  handleSelectedPeople: (people: Person[]) => void;
}

const Body: React.FC<IBody> = ({ children, handleSelectedPeople }) => {
  const { selectedPeople } = useUsers();

  useEffect(() => {
    if (selectedPeople) {
      handleSelectedPeople(selectedPeople);
    }
  }, [selectedPeople]);

  return (
    <main className='-mt-32'>
      <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow px-5 py-6 sm:px-6'>
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
