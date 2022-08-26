import CocktailApiService from './CocktailApiService';
import renderRandomData from './renderRandomData';
import { refs } from '../config/refs';
import { renderCards, noResultRender } from './renderCards';
import smoothScroll from './smoothScroll';

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
      renderCards(responce);
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  await fetchSearchValue();
  if (!cocktailApiService.drinks) return noResultRender();

  renderCards(cocktailApiService.drinks);
}

async function onSubmitBtnClick(e) {
  e.preventDefault();
  if (e.currentTarget.elements.search.value.trim() === '') return;

  await fetchSearchValue();
  smoothScroll(1.55);

  if (!cocktailApiService.drinks) return noResultRender();

  renderCards(cocktailApiService.drinks);
  refs.form.reset();
}

async function fetchSearchValue() {
  const searchText = refs.input.value.trim();
  cocktailApiService.searchQuery = searchText;
  try {
    console.log(await cocktailApiService.fetchCocktaileByName());
    await cocktailApiService.fetchCocktaileByName();
  } catch (error) {
    console.log(error.message);
  }
}
