import CocktailApiService from './CocktailApiService';

const cocktailApiService = new CocktailApiService();

const form = document.querySelector('form');

// form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(e) {
  e.preventDefault();
  cocktailApiService.querySelector = form.elements.name.value;

  e.currentTarget.reset();
}
