import { useState } from 'react';
import { useLoaderData, redirect } from 'remix';
import type { LoaderFunction, ActionFunction } from 'remix';
import { useNavigate } from 'react-router-dom';

import { useUsers } from '~/data/UserContext';

import CurrencyInput from '~/components/CurrencyInput';
import { Person } from '~/types/people';

export let loader: LoaderFunction = ({ params }) => {
  return {
    params,
  };
};

export let action: ActionFunction = async ({ params, request }) => {
  const response = await fetch(
    'https://api.github.com/gists/843c7ffbe1073bdaf45cfc48b86264c1',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  let people = JSON.parse(data.files.people.content);

  let body = new URLSearchParams(await request.text());

  people = people.map((person: Person) => {
    if (person.name === params.user?.replace('-', ' ')) {
      return {
        name: person.name,
        bank: Number(body.get('balance') ?? person.bank),
        imageUrl: person.imageUrl,
      };
    }

    return person;
  });

  await fetch('https://api.github.com/gists/843c7ffbe1073bdaf45cfc48b86264c1', {
    method: 'patch',
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      files: {
        people: { content: JSON.stringify(people, null, 2) },
      },
    }),
  });

  return redirect(`/`);
};

export default function UserProfile() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { people } = useUsers();
  const currentUser = people.filter(
    person => person.name === data.params.user.replace('-', ' ')
  )[0];

  const [firstName, setFirstName] = useState(
    currentUser.name.split(' ')[0] ?? ''
  );
  const [lastName, setLastName] = useState(
    currentUser.name.split(' ')[1] ?? ''
  );
  const [imageUrl, setImageUrl] = useState(currentUser.imageUrl);
  const [balance, setBalance] = useState<string | number>(
    currentUser.bank ?? 0
  );

  return (
    <form className='space-y-8 divide-y divide-gray-200' method='POST'>
      <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
        <div className='space-y-6 sm:space-y-5'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Personal Information
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Details about the current user.
            </p>
          </div>
          <div className='space-y-6 sm:space-y-5'>
            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                First name
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md cursor-not-allowed bg-gray-200'
                  value={firstName}
                  onChange={evnt => setFirstName(evnt.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Last name
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md cursor-not-allowed bg-gray-200'
                  value={lastName}
                  onChange={evnt => setLastName(evnt.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='imageURL'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Image URL
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  id='imageURL'
                  name='imageURL'
                  type='text'
                  className='block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-not-allowed bg-gray-200'
                  value={imageUrl}
                  onChange={evnt => setImageUrl(evnt.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='balance'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Current Balance
              </label>
              <CurrencyInput
                id='balance'
                value={balance}
                onChange={setBalance}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
