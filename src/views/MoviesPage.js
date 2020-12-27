import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import PropTypes from 'prop-types';
// import ImageGallery from './ImageGallery/ImageGallery';
import moviesAPI from '../service/home-app';
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
      .fetchMovies(query, page)
      //   .then(newMovies => {
      //     setImages(prevMovies => [...prevMovies, ...newMovies.hits]);
      //     setStatus('resolved');
      //   })

      .then(newImages => {
        console.log(newImages.results);
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
            {movies.results.map(movie => (
              <li key={movie.id}>{movie.id}</li>
            ))}
          </ul>
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

{
  /* <li className={s.ImageGalleryItem}>
  <img
    onClick={this.toggleModal}
    src={src}
    alt={alt}
    className={s.ImageGalleryItemImage}
  />
  {showModal && <Modal onClose={this.toggleModal} src={modalImg} alt={alt} />}
</li>; */
}

MoviesPage.propTypes = {
  imgItem: PropTypes.string,
};
