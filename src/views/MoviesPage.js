import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moviesAPI from '../service/home-app';
import Loader from '../Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import StatusError from '../StatusError/StatusError';
import PartOfCard from './PartOfCard/PartOfCard';
import s from './HomePage/HomePage.module.css';

export default function MoviesPage() {
  const location = useLocation();
  const [querySearchParams, setQuery] = useState(
    new URLSearchParams(location.search).get('query'),
  );
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!querySearchParams) {
      return;
    }

    setStatus('pending');

    moviesAPI
      .fetchMoviesSearch(querySearchParams)
      .then(newMovies => {
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
          <ul className={s.ItemList}>
            {movies.results.map(movie => (
              <PartOfCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                name={movie.name}
                backdrop={movie.backdrop_path}
              />
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
