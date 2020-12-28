import { NavLink, Route, useParams, useRouteMatch } from 'react-router-dom';

import { useState, useEffect } from 'react';
import * as moviesAPI from '../service/home-app';
import StatusError from '../StatusError/StatusError';

export default function Cast() {
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  //   const { url } = useRouteMatch();
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  //   console.log(url);

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
          <ul>
            {actors.cast.map(actor => (
              <li key={actor.name}>
                <NavLink to={`${url}/${actor.id}`}>{actor.name}</NavLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

//  <Route path="/movies/:movieId/cast">
//    <Cast />
//  </Route>;
