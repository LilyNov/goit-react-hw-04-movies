import { useLocation, useHistory } from 'react-router-dom';

export default function CardOfMovie({
  title,
  popularity,
  release,
  image,
  overview,
}) {
  const location = useLocation();
  const history = useHistory();

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  return (
    <>
      <button type="button" onClick={onGoBack}>
        Back
      </button>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>Popularity {popularity}</p>
      <p>Release date {release}</p>
      <p>{overview}</p>
    </>
  );
}
