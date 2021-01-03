import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/home-app';
import StatusError from '../../StatusError/StatusError';
import s from '../HomePage/HomePage.module.css';
import PartOfCard from '../PartOfCard/PartOfCard';

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
            {actors.cast.map(actor => (
              <PartOfCard
                backdrop={actor.profile_path}
                name={actor.name}
                key={actor.id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
