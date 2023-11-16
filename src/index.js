import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import catAPI from './cat-api.js';

const catInfo = document.getElementById('cat-info-section');
const selector = document.querySelector('.breed-select');

const loader = document.querySelector('.loader');
loader.classList.add('hidden');
// const error = document.querySelector('.error');
// error.classList.add('hidden');

// Select cat breed

function getCatsList() {
  loader.classList.remove('hidden');
  return catAPI
    .fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        selector.innerHTML += `<option value="${breed.id}">${breed.name}</option>`;
      });
    })
    .catch(onError)
    .finally(() => {
      loader.classList.add('hidden');
    });
}

getCatsList();

// Show info about cat breed

selector.addEventListener('change', selectBreed);

function selectBreed(e) {
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
  const breed = e.currentTarget.value;
  catAPI
    .fetchBreedByID(breed)
    .then(article => createMarkup(article))
    .then(markup => showBreedInfo(markup))
    .catch(onError)
    .finally(() => {
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
    });
}

function createMarkup(article) {
  const name = article.breeds[0].name;
  const description = article.breeds[0].description;
  const temperament = article.breeds[0].temperament;
  const url = article.url;
  // const { breeds, url } = article[0];
  // const { name, description, temperament } = breeds[0];
  return `
      <div class="cat__content">
        <h2 class="cat_header">${name}</h2>
        <p class="cat__text">${description}}</p>
        <span class="cat__temperament">Temperament: </span>
        <span>${temperament}</span>
      </div>
      <div class="cat__figure">
        <img src="${url}" alt="cat photo">
      </div>
    `;
}

function showBreedInfo(markup) {
  document.getElementById('cat-info-section').innerHTML = markup;
}

function onError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
