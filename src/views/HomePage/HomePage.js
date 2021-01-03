import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import * as moviesAPI from '../../service/home-app';
import StatusError from '../../StatusError/StatusError';
import s from '../HomePage/HomePage.module.css';

const makeSlug = string => slugify(string, { lower: true });

export default function HomePage() {
  const location = useLocation();
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
          <ul className={s.ItemList}>
            {movies.results.map(({ id, title, name, backdrop_path }) => (
              <li className={s.ImageGalleryItem} key={id}>
                <Link
                  className={s.link}
                  to={{
                    pathname: `movies/${makeSlug(`${title} ${id}`)}`,
                    state: { from: location },
                  }}
                >
                  <img
                    className={s.ImageGalleryItemImage}
                    src={
                      backdrop_path !== null
                        ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                        : 'https://dummyimage.com/480x600/2a2a2a/ffffff&text=Movie+foto'
                    }
                    alt={title}
                  />
                  <p className={s.text}>
                    {name} {title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
