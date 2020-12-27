import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import PropTypes from 'prop-types';
import * as moviesAPI from '../service/home-app';
import Loader from '../Loader/Loader';
import StatusError from '../StatusError/StatusError';
// import Button from './Button/Button';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    moviesAPI
      .fetchMoviesSearch(query, page)
      //   .then(newMovies => {
      //     setImages(prevMovies => [...prevMovies, ...newMovies.hits]);
      //     setStatus('resolved');
      //   })

      .then(newMovies => {
        setMovies(newMovies);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query, page]);

  //   const onClickLoadMoreBtn = () => {
  //     setPage(page => page + 1);
  //   };

  return (
    <div>
      <Searchbar getMovies={setQuery} getPage={setPage} getRender={setMovies} />

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
                {name} {title}
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
  imgItem: PropTypes.string,
};
