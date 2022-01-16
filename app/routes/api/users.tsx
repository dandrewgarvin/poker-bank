import { json, LoaderFunction } from 'remix';
import GistService from '~/services/gist/gist';

function validateToken(auth_token: string | null) {
  let error = undefined;

  if (!auth_token) {
    error = 'Missing Authorization header';
  }

  auth_token = auth_token?.replace('Bearer ', '') ?? null;
  if (auth_token !== process.env.API_TOKEN) {
    error = 'Invalid Authorization header';
  }

  if (error) {
    throw new Error(error);
  }

  return true;
}

export let loader: LoaderFunction = async ({ request }) => {
  const auth_token = request.headers.get('Authorization');

  try {
    validateToken(auth_token);
  } catch (err) {
    return json(
      {
        error: (err as Error).message,
      },
      401
    );
  }

  const gist = new GistService(fetch);

  let users = await gist.get();
  users = users.sort((a: any, b: any) => {
    if (a.bank < b.bank) return 1;
    if (a.bank > b.bank) return -1;
    return 0;
  });

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') ?? null;

  return {
    users: Number(limit) ? users.slice(0, Number(limit)) : users,
  };
};
