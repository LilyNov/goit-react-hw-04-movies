import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useRouteMatch } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import PropTypes from 'prop-types';
import * as moviesAPI from '../service/home-app';
import Loader from '../Loader/Loader';
import StatusError from '../StatusError/StatusError';
// import { createBrowserHistory } from 'history';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    moviesAPI
      .fetchMoviesSearch(query)
      .then(newMovies => {
        setMovies(newMovies);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query]);

  return (
    <div>
      <Searchbar getMovies={setQuery} getRender={setMovies} />

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
                <Link to={`${url}/${id}`}>
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
