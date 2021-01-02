import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../service/home-app';
import StatusError from '../StatusError/StatusError';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

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
            {movies.results.map(({ id, title, name, backdrop_path }) => (
              <li key={id}>
                <img
                  src={
                    backdrop_path !== null
                      ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                      : 'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Movie+foto'
                  }
                  alt={title}
                />
                <Link to={`movies/${id}`}>
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
