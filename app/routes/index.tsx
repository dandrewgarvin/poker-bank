import { Link } from 'react-router-dom';

import { useUsers } from '../data/UserContext';

const Index = () => {
  const { people } = useUsers();

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {people.map(person => (
        <Link
          key={person.name}
          to={`/profile/${person.name.replace(' ', '-')}`}
          className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
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
              <p className='text-sm font-medium text-gray-900'>{person.name}</p>
              <p className='text-sm text-gray-500 truncate'>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(person.bank)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;
