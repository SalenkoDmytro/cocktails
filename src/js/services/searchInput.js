import CocktailApiService from './CocktailApiService';
import renderRandomData from './renderRandomData';
import { refs } from '../config/refs';
import { renderCards } from './renderCards';

const cocktailApiService = new CocktailApiService();
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;

refs.form.addEventListener('submit', onSubmitBtnClick);
refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

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

  console.log(renderCards(cocktailApiService.drinks));
  console.log('Надо зарендерить >>>', cocktailApiService.drinks);
}

async function onSubmitBtnClick(e) {
  e.preventDefault();
  if (e.currentTarget.elements.search.value.trim() === '') return;
  await fetchSearchValue();
  console.log('Надо зарендерить >>>', cocktailApiService.drinks);
  refs.form.reset();
}

async function fetchSearchValue() {
  const searchText = refs.input.value.trim();
  cocktailApiService.searchQuery = searchText;
  try {
    await cocktailApiService.fetchCocktaileByName();
  } catch (error) {
    console.log(error.message);
  }
}
