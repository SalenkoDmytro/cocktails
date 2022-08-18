import CocktailApiService from './CocktailApiService';
import renderRandomData from './renderRandomData';

const cocktailApiService = new CocktailApiService();
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;

const form = document.querySelector('.header__search-wrapper');
const input = form.elements.search;

form.addEventListener('submit', onSubmitBtnClick);
input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

async function onInputChange(e) {
  if (e.target.value.trim() === '') {
    try {
      cocktailApiService.resetSetting();
      const responce = await renderRandomData();
      console.log('Надо зарендерить >>>', responce);
    } catch (error) {
      console.log(error.message);
    }
    return;
  }
  fetchSearchValue();
}

async function onSubmitBtnClick(e) {
  e.preventDefault();
  if (e.currentTarget.elements.search.value.trim() === '') return;
  fetchSearchValue();
  form.reset();
}

async function fetchSearchValue() {
  const searchText = input.value.trim();
  cocktailApiService.searchQuery = searchText;
  try {
    await cocktailApiService.fetchCocktaileByName();
    console.log('Надо зарендерить >>>', cocktailApiService.drinks);
  } catch (error) {
    console.log(error.message);
  }
}
