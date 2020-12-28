import { Route, useParams } from 'react-router-dom';
// import { Link, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../service/home-app';
import StatusError from '../StatusError/StatusError';
import CardOfMovie from '../CardOfMovie/CardOfMovie';
import Cast from '../Cast/Cast';

export default function MovieDetailsPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  //   const { url } = useRouteMatch();
  const { movieId } = useParams();

  //   console.log(url);

  useEffect(() => {
    setStatus('pending');

    moviesAPI
      .fetchMoviesInfo(movieId)
      .then(newMovies => {
        setMovies(newMovies);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [movieId]);

  return (
    <div>
      {status === 'rejected' && (
        <StatusError message={error.message} style={{ textAlign: 'center' }} />
      )}

      {status === 'resolved' && (
        <>
          <CardOfMovie
            title={movies.title}
            popularity={movies.popularity}
            release={movies.release_date}
            image={`https://api.themoviedb.org/3/movie/${movieId}/images${movies.backdrop_path}?api_key=f63615632bb4d22515832e1a6cf24a3e&language=en-US`}
            overview={movies.overview}
          />
          <Cast />
        </>
      )}
    </div>
  );
}
