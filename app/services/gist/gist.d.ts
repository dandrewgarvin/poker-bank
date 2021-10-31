import { Person } from '~/types/people.d';

interface GistService {
  get(): Promise<Array<Person>>;
  update(people: Array<Person>): Promise<void>;
}

type API = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export { GistService, API };
