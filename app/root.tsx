import { useState } from 'react';
import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
} from 'remix';
import { Meta, Links, Scripts, LiveReload, useCatch } from 'remix';
import { Outlet } from 'react-router-dom';

import UserContext from './data/UserContext';

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

const navigation = [
  { name: 'Chip Bank', title: 'Overview', href: '/' },
  // { name: 'Chips', href: '/chips' },
  // { name: 'Profile', href: '/profile' },
];

export default function App() {
  const { people } = useLoaderData();

  const [activeRoute, setActiveRoute] = useState<Route>(navigation[0]);

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
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold text-white'>
                {activeRoute.name}
              </h1>
            </div>
          </header>
        </div>

        <UserContext people={people}>
          <main className='-mt-32'>
            <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
              <div className='bg-white rounded-lg shadow px-5 py-6 sm:px-6'>
                <Outlet />
              </div>
            </div>
          </main>
        </UserContext>
      </div>
    </Document>
  );
}

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
