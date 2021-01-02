import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/home-app';
import StatusError from '../../StatusError/StatusError';
import s from '../Cast/Cast.module.css';

export default function Cast() {
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');

    moviesAPI
      .fetchActorsInfo(movieId)
      .then(actors => {
        setActors(actors);
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
          <ul className={s.ItemList}>
            {actors.cast.map(({ profile_path, name }) => (
              <li className={s.ImageGalleryItem} key={name}>
                <img
                  className={s.ImageGalleryItemImage}
                  src={
                    profile_path !== null
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : 'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Foto'
                  }
                  alt={name}
                />

                <p> {name}</p>
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}
    </div>
  );
}
