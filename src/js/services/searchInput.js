import CocktailApiService from './CocktailApiService';
import renderRandomData from './renderRandomData';

const cocktailApiService = new CocktailApiService();
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const form = document.querySelector('.header__search-wrapper');
const input = form.elements.search;

form.addEventListener('submit', onSubmitBtnClick);
input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

async function onInputChange(e) {
  if (e.target.value.trim() === '') {
    try {
      cocktailApiService.resetSetting();
      const responce = await renderRandomData();
      if (!responce) {
        console.log('Сори ничего не нашли');
        return;
      }
      console.log('Надо зарендерить >>>', responce);
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  await fetchSearchValue();
  if (!cocktailApiService.drinks)
    return console.log('Сюда добавить рендер что ничего не найдено');

  console.log('Надо зарендерить >>>', cocktailApiService.drinks);
}

async function onSubmitBtnClick(e) {
  e.preventDefault();
  if (e.currentTarget.elements.search.value.trim() === '') return;
  await fetchSearchValue();
  console.log('Надо зарендерить >>>', cocktailApiService.drinks);
  form.reset();
}

async function fetchSearchValue() {
  const searchText = input.value.trim();
  cocktailApiService.searchQuery = searchText;
  try {
    await cocktailApiService.fetchCocktaileByName();
  } catch (error) {
    console.log(error.message);
  }
}
