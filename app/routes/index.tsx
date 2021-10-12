import { Link } from 'react-router-dom';

import { useUsers } from '../data/UserContext';

const Index = () => {
  const { people } = useUsers();

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {people
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        .sort((a, b) => {
          if (a.bank > b.bank) return -1;
          if (a.bank < b.bank) return 1;
          return 0;
        })
        .map((person, index) => {
          let cardColor = '';

          switch (index) {
            case 0:
              cardColor =
                'bg-yellow-300 bg-opacity-50 border-yellow-300 hover:border-yellow-500';
              break;
            case 1:
              cardColor = 'bg-gray-200 border-gray-300';
              break;
            case 2:
              cardColor =
                'bg-yellow-700 bg-opacity-25 border-yellow-300 hover:border-yellow-600';
              break;
            default:
              cardColor = 'bg-white border-gray-300';
              break;
          }

          return (
            <Link
              key={person.name}
              to={`/profile/${person.name.replace(' ', '-')}`}
              className={`relative rounded-lg border px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 ${cardColor}`}
            >
              <div className='flex-shrink-0'>
                <img
                  className='h-10 w-10 rounded-full'
                  src={person.imageUrl}
                  alt=''
                />
              </div>
              <div className='flex-1 min-w-0'>
                <div className='focus:outline-none'>
                  <span className='absolute inset-0' aria-hidden='true' />
                  <p className='text-sm font-medium text-gray-900'>
                    {person.name}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(person.bank)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Index;
