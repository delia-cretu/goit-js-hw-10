import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_H6y8AbAkM4hhLEApJU2a4mYj2lvf2JQqL6g48faElJfjpsdzsmJ8bIZVrSa1w8IU';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

function fetchBreedByID(breed) {
  return axios
    .get(`/images/search?breed_ids=${breed}`)
    .then(res => res.data[0]);
}

module.exports = { fetchBreeds, fetchBreedByID };
