import CocktailApiService from './CocktailApiService';
import { refs } from '../config/refs';
import { createDroplist } from './renderMobLetters';

const cocktailApiService = new CocktailApiService();

refs.lettersList.addEventListener('click', onLetterClick);
refs.inputMobile.addEventListener('click', onMobLetterClick);

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

function onMobLetterClick() {
  if (refs.selectLetter.children.length > 1) {
    refs.selectLetter.lastChild.remove();
    return;
  }

  createDroplist();
  refs.selectLetter.lastChild.addEventListener('click', e => {
    onLetterClick(e);
    refs.inputSpan.textContent = e.target.dataset.letter.toUpperCase();
    refs.selectLetter.lastChild.remove();
  });
}
