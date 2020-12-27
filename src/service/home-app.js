const KEY = 'f63615632bb4d22515832e1a6cf24a3e';
const BASE_URL = `https://api.themoviedb.org/3`;

async function fetchMoviesErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMoviesSearch(name, page) {
  return fetchMoviesErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${name}&language=en-US&page=${page}&include_adult=false`,
  );
}

// function fetchMovies(name, page) {
//   const KEY = 'f63615632bb4d22515832e1a6cf24a3e';
// https: const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false`;
//   return fetch(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}&per_page=12`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error('Error'));
//   });
// }

// const api = { fetchMovies };

// export default api;
