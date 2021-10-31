import { useLocation } from 'react-router';

import NavBar, { Route } from './NavBar';

export interface Props {
  routes: Array<Route>;
  activeRoute: Route;
  setActiveRoute(route: Route): void;
  selecting: boolean;
  setSelecting(selecting: boolean): void;
  handleDistribute(): void;
}

const Header = ({
  routes,
  activeRoute,
  setActiveRoute,
  selecting,
  setSelecting,
  handleDistribute,
}: Props) => {
  const location = useLocation();
  return (
    <>
      <NavBar
        routes={routes}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
      />
      <div className='bg-gray-800 pb-32'>
        <header className='py-10'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between'>
            <h1 className='text-3xl font-bold text-white'>
              {activeRoute.name}
            </h1>

            {location.pathname === '/' && (
              <span className='flex'>
                <button
                  className='text-white btn p-2 rounded bg-indigo-500'
                  onClick={() => setSelecting(!selecting)}
                >
                  {!selecting ? 'Stimmy Payments' : 'Cancel Stimmys'}
                </button>
                {selecting && (
                  <button
                    className='text-white btn p-2 rounded bg-indigo-500 ml-2'
                    onClick={() => handleDistribute()}
                  >
                    Distribute Stimmys
                  </button>
                )}
              </span>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
