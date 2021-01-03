import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/home-app';
import StatusError from '../../StatusError/StatusError';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');

    moviesAPI
      .fetchReviews(movieId)
      .then(reviews => {
        console.log(reviews);
        if (reviews.results.length) {
          setReviews(reviews);
          setStatus('resolved');
          return;
        }
        return Promise.reject(new Error('Sorry. No information on request'));
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
            {reviews.results.map(({ id, content }) => (
              <li key={id} style={{ listStyle: 'none' }}>
                <p style={{ color: 'white' }}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
