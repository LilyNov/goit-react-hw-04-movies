import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import Searchbar from './Searchbar/Searchbar';
import PropTypes from 'prop-types';
import * as moviesAPI from '../service/home-app';
import Loader from '../Loader/Loader';
import StatusError from '../StatusError/StatusError';

export default function MoviesPage() {
  const location = useLocation();
  const [querySearchParams, setQuery] = useState(
    new URLSearchParams(location.search).get('query'),
  );
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!querySearchParams) {
      return;
    }

    setStatus('pending');

    moviesAPI
      .fetchMoviesSearch(querySearchParams)
      .then(newMovies => {
        console.log(newMovies);
        if (newMovies.results.length === 0) {
          <StatusError
            message={error.message}
            style={{ textAlign: 'center' }}
          />;
        } else {
          setMovies(newMovies);
          setStatus('resolved');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [querySearchParams]);

  return (
    <div>
      <Searchbar getMovies={setQuery} />

      {status === 'idle' && <p style={{ textAlign: 'center' }}>Let's Go!</p>}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && (
        <StatusError message={error.message} style={{ textAlign: 'center' }} />
      )}

      {status === 'resolved' && (
        <>
          <ul>
            {movies.results.map(({ id, title, name }) => (
              <li key={id}>
                <Link
                  to={{
                    pathname: `${url}/${id}`,
                    state: { from: location },
                  }}
                >
                  {name} {title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

MoviesPage.propTypes = {
  query: PropTypes.string,
};
