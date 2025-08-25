import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { Personn } from './person';
import { useState } from 'react';

interface Props {
  isLoading: boolean;
  people?: Person[] | [];
  isError?: boolean;
  userQuery: string;
  sexQuery: string;
  agePeople: string[];
}

export const BlockOfPeople: React.FC<Props> = ({
  isLoading,
  people,
  isError,
  userQuery,
  sexQuery,
  agePeople,
}) => {
  const { slug } = useParams();

  const [sortBy, setSortBy] = useState<'name' | 'sex' | 'born' | 'died' | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <div className="block">
      <div className="box table-container">
        {isError && (
          <>
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </>
        )}
        {people && people.length === 0 && !isError && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  Name
                  <a
                    href="#/people?sort=name"
                    onClick={e => {
                      e.preventDefault();

                      if (sortBy === 'name') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('name');
                        setSortOrder('asc');
                      }
                    }}
                  >
                    <span className="icon">
                      {sortBy === 'name' ? (
                        sortOrder === 'asc' ? (
                          <i className="fas fa-sort-up" />
                        ) : (
                          <i className="fas fa-sort-down" />
                        )
                      ) : (
                        <i className="fas fa-sort" />
                      )}
                    </span>
                  </a>
                </th>
                <th>
                  Sex
                  <a
                    href="#/people?sort=name"
                    onClick={e => {
                      e.preventDefault();

                      if (sortBy === 'sex') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('sex');
                        setSortOrder('asc');
                      }
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </th>
                <th>
                  Born
                  <a
                    href="#/people?sort=name"
                    onClick={e => {
                      e.preventDefault();

                      if (sortBy === 'born') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('born');
                        setSortOrder('asc');
                      }
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </th>
                <th>
                  Died
                  <a
                    href="#/people?sort=name"
                    onClick={e => {
                      e.preventDefault();

                      if (sortBy === 'died') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('died');
                        setSortOrder('asc');
                      }
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people &&
                people
                  .filter(person => {
                    const matchesName = person.name.includes(userQuery);
                    const matchesSex = person.sex.includes(sexQuery);

                    const personAge = Math.ceil(person.died / 100);

                    const matchesAge =
                      agePeople.length === 0 ||
                      agePeople.includes(String(personAge));

                    return matchesName && matchesSex && matchesAge;
                  })
                  .sort((a, b) => {
                    if (!sortBy) {
                      return 0;
                    }

                    if (!sortBy) {
                      return 0;
                    }

                    switch (sortBy) {
                      case 'name':
                        return sortOrder === 'asc'
                          ? a.name.localeCompare(b.name)
                          : b.name.localeCompare(a.name);
                      case 'sex':
                        return sortOrder === 'asc'
                          ? a.sex.localeCompare(b.sex)
                          : b.sex.localeCompare(a.sex);
                      case 'born':
                        return sortOrder === 'asc'
                          ? a.born - b.born
                          : b.born - a.born;
                      case 'died':
                        return sortOrder === 'asc'
                          ? a.died - b.died
                          : b.died - a.died;
                      default:
                        return 0;
                    }
                  })
                  .map((person, i) => (
                    <Personn
                      key={person.slug}
                      person={person}
                      i={i}
                      selectedSlug={slug}
                      people={people}
                    />
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
