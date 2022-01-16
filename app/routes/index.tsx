import { useCallback, useEffect, useState } from 'react';
import { ActionFunction, redirect, useSubmit } from 'remix';
import { Link } from 'react-router-dom';

import { Person } from '~/types/people';

import GistService from '~/services/gist/gist';

import MainLayout from '~/layouts/Main';

import { useUsers } from '../contexts/UserContext';

export let action: ActionFunction = async ({ params, request }) => {
  const gist = new GistService(fetch);

  let body = new URLSearchParams(await request.text());
  let selected: Array<Person> = JSON.parse(body.get('selected') ?? '');

  const ALLOWENCE = 2500;
  selected = selected.map(person => ({
    ...person,
    bank: person.bank + ALLOWENCE,
  }));

  await gist.update(selected);

  return redirect('?selecting=false');
};

const Index = () => {
  const submit = useSubmit();

  const { people, selecting, setSelectedPeople } = useUsers();
  const [selected, setSelected] = useState<Array<Person>>([]);

  const handleSelectUser = useCallback(
    (user: Person) => {
      if (selected.find(u => user.name === u.name)) {
        let newSelected = [...selected];
        newSelected = newSelected.filter(u => u.name !== user.name);
        setSelected(newSelected);
      } else {
        const newSelected = [...selected];
        newSelected.push(user);
        setSelected(newSelected);
      }
    },
    [selected]
  );

  useEffect(() => {
    if (!selecting) {
      setSelected([]);
    }
  }, [selecting]);

  useEffect(() => {
    setSelectedPeople(selected);
  }, [selected]);

  const handleDistribute = useCallback(people => {
    const form = new FormData();
    form.set('selected', JSON.stringify(people));

    submit(form, { method: 'post' });
  }, []);

  return (
    <MainLayout handleDistribute={handleDistribute}>
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
            const isSelected = selected.find(u => u.name === person.name);
            let cardColor = '';

            if (!selecting) {
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
            } else {
              if (isSelected) {
                cardColor = 'bg-green-500 bg-opacity-20';
              }
            }

            return (
              <Link
                key={person.name}
                onClick={() => selecting && handleSelectUser(person)}
                to={
                  !selecting ? `/profile/${person.name.replace(' ', '-')}` : '#'
                }
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
    </MainLayout>
  );
};

export default Index;
