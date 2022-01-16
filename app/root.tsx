import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
} from 'remix';
import { Meta, Links, Scripts, LiveReload, useCatch } from 'remix';
import { Outlet } from 'react-router-dom';

import stylesUrl from './styles/app.css';

import { Person } from './types/people';

import GistService from './services/gist/gist';

import UserContext from './contexts/UserContext';

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl },
  ];
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

export let loader: LoaderFunction = async () => {
  const gist = new GistService(fetch);

  const people = await gist.get();

  return {
    people,
  };
};

export default function App() {
  const { people }: { people: Array<Person> } = useLoaderData();

  return (
    <Document>
      <UserContext people={people}>
        <Outlet />
      </UserContext>
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
