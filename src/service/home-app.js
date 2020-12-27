function fetchMovies(name, page) {
  const KEY = 'f63615632bb4d22515832e1a6cf24a3e';

  return fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Error'));
  });
}

const api = { fetchMovies };

export default api;
