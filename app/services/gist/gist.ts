import { GistService, API } from './gist.d';
import { Person } from '~/types/people';

class Gist implements GistService {
  constructor(private readonly api: API) {}

  async get() {
    const url = `https://api.github.com/gists/${process.env.GITHUB_GIST_ID}`;

    const response = await this.api(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    const people: Array<Person> = JSON.parse(data.files.people.content);

    return people;
  }

  async update(people: Array<Person>) {
    const old_people = await this.get();

    const new_people = old_people.map(old_person => {
      const new_person = people.find(person => person.name === old_person.name);
      return new_person || old_person;
    });

    await this.api(
      `https://api.github.com/gists/${process.env.GITHUB_GIST_ID}`,
      {
        method: 'patch',
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          files: {
            people: { content: JSON.stringify(new_people, null, 2) },
          },
        }),
      }
    );
  }
}

export default Gist;
