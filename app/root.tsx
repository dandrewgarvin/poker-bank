import { useCallback, useEffect, useState } from 'react';
import {
  ActionFunction,
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
} from 'remix';
import {
  Meta,
  Links,
  Scripts,
  LiveReload,
  useCatch,
  useSubmit,
  redirect,
} from 'remix';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import UserContext, { useUsers } from './data/UserContext';

import Header from './components/Header';
import type { Route } from './components/Header';

import stylesUrl from './styles/global.css';
import tailwindStyles from './styles/app.css';
import { Person } from './types/people';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl },
    { rel: 'stylesheet', href: tailwindStyles },
  ];
};

export let loader: LoaderFunction = async () => {
  const response = await fetch(
    'https://api.github.com/gists/843c7ffbe1073bdaf45cfc48b86264c1',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  return {
    people: JSON.parse(data.files.people.content),
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
  let selected: Array<Person> = JSON.parse(body.get('selected') ?? '');

  const ALLOWENCE = 350;
  people = people.map((person: Person) => {
    if (selected.find(s => s.name === person.name)) {
      return {
        name: person.name,
        bank: person.bank + ALLOWENCE,
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

  return redirect('?selecting=false');
};

export let meta: MetaFunction = () => {
  return {
    title: 'Poker Bank',
  };
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.png' type='image/png' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

const navigation = [{ name: 'Chip Bank', title: 'Overview', href: '/' }];

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default function App() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const location = useLocation();

  const { people } = useLoaderData();

  const [activeRoute, setActiveRoute] = useState<Route>(navigation[0]);
  const [selecting, setSelecting] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Array<Person>>([]);

  const handleDistribute = useCallback(() => {
    const form = new FormData();
    form.set('selected', JSON.stringify(selectedPeople));

    submit(form, { method: 'post' });
  }, [selectedPeople]);

  useEffect(() => {
    const isSelecting = queryParams.get('selecting');

    if (isSelecting !== null) {
      setSelecting(false);
      setSelectedPeople([]);
      navigate('/');
    }
  }, [location.search]);

  return (
    <Document>
      <div>
        <Header
          routes={navigation}
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
        />
        <div className='bg-gray-800 pb-32'>
          <header className='py-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between'>
              <h1 className='text-3xl font-bold text-white'>
                {activeRoute.name}
              </h1>

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
            </div>
          </header>
        </div>

        <UserContext people={people} selecting={selecting}>
          <Main handleSelectedPeople={setSelectedPeople} />
        </UserContext>
      </div>
    </Document>
  );
}

const Main = ({
  handleSelectedPeople,
}: {
  handleSelectedPeople(people: Array<Person>): void;
}) => {
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
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title='Uh-oh!'>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
