export default function CardOfMovie({
  title,
  popularity,
  release,
  image,
  overview,
}) {
  return (
    <>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>Popularity {popularity}</p>
      <p>Release date {release}</p>
      <p>{overview}</p>
    </>
  );
}
