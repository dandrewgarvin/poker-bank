import React, { useState } from 'react';
import { useLoaderData, redirect } from 'remix';
import type { LoaderFunction, ActionFunction } from 'remix';
import { useNavigate } from 'react-router-dom';

import GistService from '~/services/gist/gist';

import { useUsers } from '~/contexts/UserContext';

import CurrencyInput from '~/components/CurrencyInput';

export let loader: LoaderFunction = ({ params }) => {
  return {
    params,
  };
};

export let action: ActionFunction = async ({ params, request }) => {
  const body = new URLSearchParams(await request.text());
  const gist = new GistService(fetch);

  const addToBalance = body.get('add-to-balance') ?? false;
  const originalBalance = Number(body.get('original-balance') ?? 0);
  const balance = Number(body.get('balance') ?? 0);

  await gist.update([
    {
      name: params.user?.replace('-', ' ') || '',
      bank: addToBalance ? originalBalance + balance : balance,
      imageUrl: body.get('imageURL') || '',
    },
  ]);

  return redirect(`/`);
};

export default function UserProfile() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { people } = useUsers();
  const currentUser = people.filter(
    person => person.name === data.params.user.replace('-', ' ')
  )[0];

  const [firstName] = useState(currentUser?.name.split(' ')[0] ?? '');
  const [lastName] = useState(currentUser?.name.split(' ')[1] ?? '');
  const [imageUrl] = useState(currentUser?.imageUrl);
  const [balance, setBalance] = useState<string | number>(
    currentUser?.bank ?? 0
  );
  const [addBalance, setAddBalance] = useState(false);

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
                  defaultValue={firstName}
                  readOnly
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
                  defaultValue={lastName}
                  readOnly
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
                  defaultValue={imageUrl}
                  readOnly
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
              <input
                name='original-balance'
                defaultValue={currentUser?.bank}
                hidden
              />
              <CurrencyInput
                id='balance'
                value={balance}
                onChange={setBalance}
              />

              <div className='flex align-center items-center h-full'>
                <input
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2'
                  id='add-balance'
                  name='add-to-balance'
                  type='checkbox'
                  checked={addBalance}
                  onChange={evnt => {
                    setAddBalance(evnt.target.checked);
                  }}
                />
                <label
                  htmlFor='add-balance'
                  className='text-sm font-medium text-gray-700'
                >
                  Add to Balance
                </label>
              </div>
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
