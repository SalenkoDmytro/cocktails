import CocktailApiService from './CocktailApiService';
import { refs } from '../config/refs';

const cocktailApiService = new CocktailApiService();

refs.lettersList.addEventListener('click', onLetterClick);
refs.lettersListMobile.addEventListener('click', onMobLetterClick);

async function onLetterClick(e) {
  if (!e.target.dataset.letter) return;
  cocktailApiService.searchQuery = e.target.dataset.letter;

  try {
    await cocktailApiService.fetchCocktaileByFirstLetter();
    if (!cocktailApiService.drinks)
      return console.log('Сюда добавить рендер что ничего не найдено');

    console.log('Надо зарендерить >>>', cocktailApiService.drinks);
  } catch (error) {
    console.log(error.message);
  }
}

async function onMobLetterClick(e) {
  e.target.nodeName;
  console.log(e.target.nodeName === 'LI');
}
