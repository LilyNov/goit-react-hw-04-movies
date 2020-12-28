import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../service/home-app';
import StatusError from '../StatusError/StatusError';

// import Button from '../Button/Button';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url } = useRouteMatch();

  useEffect(() => {
    setStatus('pending');

    moviesAPI
      .fetchMoviesHomePage()
      .then(newMovies => {
        setMovies(newMovies);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, []);

  return (
    <div>
      {status === 'rejected' && (
        <StatusError message={error.message} style={{ textAlign: 'center' }} />
      )}

      {status === 'resolved' && (
        <>
          <ul>
            {movies.results.map(({ id, title, name }) => (
              <li key={id}>
                <Link to={`${url}${id}`}>
                  {name} {title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
