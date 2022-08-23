import CocktailApiService from '../services/CocktailApiService';
import { refs } from '../config/refs';
import { renderModalCocktail, renderModalIngredient } from './renderModal';

const cocktailApiService = new CocktailApiService();

refs.openModalCocktailBtn.addEventListener('click', onOpenModalCocktail);

async function onOpenModalCocktail(e) {
  if (e.target.dataset.type !== 'open-learn-more') return;
  refs.backdropCocktail.classList.remove('visually-hidden');

  cocktailApiService.searchQuery = e.target.dataset.id;
  await cocktailApiService.fetchCocktailById();

  renderModalCocktail(cocktailApiService.drinks[0]);
  addListeners();
}

async function onClick(e) {
  if (e.target.dataset.type === 'open-ingredient') return onClickOpenIngr(e);
  if (e.target.dataset.modal === 'close-cocktail') return onModalClose();
  if (e.target.dataset.modal === 'close-ingredient') {
    return renderModalCocktail(cocktailApiService.drinks[0]);
  }
  if (e.target.classList.contains('backdrop__cocktail')) {
    if (document.querySelector('.modal__ingredient')) {
      return renderModalCocktail(cocktailApiService.drinks[0]);
    }
    onModalClose();
  }
}

export function onModalClose() {
  removeListeners();
  refs.backdropCocktail.classList.add('visually-hidden');
}

function addListeners() {
  refs.backdropCocktail.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscKeyPress);
}

function removeListeners() {
  refs.backdropCocktail.removeEventListener('click', onClick);
  document.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (document.querySelector('.modal__ingredient')) {
    return renderModalCocktail(cocktailApiService.drinks[0]);
  }
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    onModalClose();
  }
}

async function onClickOpenIngr(e) {
  cocktailApiService.searchQuery = e.target.dataset.name;
  await cocktailApiService.fetchIngredientsByName();
  if (cocktailApiService.ingredients[0].strIngredient === e.target.dataset.name)
    return renderModalIngredient(cocktailApiService.ingredients[0]);
  console.log('Сюда добавить модалку с пьяной кнопкой');
}
