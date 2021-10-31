import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export interface Route {
  name: string;
  title?: string;
  href: string;
}

export interface Props {
  routes: Array<Route>;
  activeRoute: Route;
  setActiveRoute(route: Route): void;
}

const NavBar = ({ routes, activeRoute, setActiveRoute }: Props) => {
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='border-b border-gray-700'>
              <div className='flex items-center justify-between h-16 px-4 sm:px-0'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-8 w-8'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                      alt='Workflow'
                    />
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      {routes.map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setActiveRoute(item)}
                          className={classNames(
                            item.name === activeRoute.name
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                          )}
                          aria-current={
                            item.name === activeRoute.name ? 'page' : undefined
                          }
                        >
                          {item.title ?? item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='-mr-2 flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='border-b border-gray-700 md:hidden'>
            <div className='px-2 py-3 space-y-1 sm:px-3'>
              {routes.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.name === activeRoute.name
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={
                    item.name === activeRoute.name ? 'page' : undefined
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
