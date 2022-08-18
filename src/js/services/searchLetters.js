import CocktailApiService from './CocktailApiService';

const cocktailApiService = new CocktailApiService();

const lettersList = document.querySelector('.hero__list');

lettersList.addEventListener('click', onLetterClick);

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
