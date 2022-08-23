import CocktailApiService from '../services/CocktailApiService';
import { refs } from '../config/refs';
import { renderModalCocktail, renderModalIngredient } from './renderModal';

const cocktailApiService = new CocktailApiService();

refs.openModalCocktailBtn.addEventListener('click', onOpenModalCocktail);

import { addModalCocktailClick, delModalCocktailClick, addModalIngredientClick, delModalIngredientClick } from '../firebase/firebaseDb'


async function onOpenModalCocktail(e) {
  if (e.target.dataset.type !== 'open-learn-more') return;
  refs.backdropCocktail.classList.remove('visually-hidden');

  cocktailApiService.searchQuery = e.target.dataset.id;
  await cocktailApiService.fetchCocktailById();

  renderModalCocktail(cocktailApiService.drinks[0]);
  addModalCocktailClick();
  addListeners();
}

async function onClick(e) {
  if (e.target.dataset.type === 'open-ingredient') {
    delModalCocktailClick()
    onClickOpenIngr(e);
    addModalIngredientClick();
    return
  }
  if (e.target.dataset.modal === 'close-cocktail') {
    delModalCocktailClick()
    onModalClose()
    return
  };
  if (e.target.dataset.modal === 'close-ingredient') {
    renderModalCocktail(cocktailApiService.drinks[0]);
    delModalIngredientClick();
    addModalCocktailClick();
    return
  }
  if (e.target.classList.contains('backdrop__cocktail')) {
    if (document.querySelector('.modal__ingredient')) {
      renderModalCocktail(cocktailApiService.drinks[0]);
      addModalCocktailClick();
      return
    }
    delModalCocktailClick();
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
    delModalIngredientClick();
    renderModalCocktail(cocktailApiService.drinks[0]);
    addModalCocktailClick();
    return
  }
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    delModalCocktailClick();
    delModalIngredientClick();
    onModalClose();
  }
}

async function onClickOpenIngr(e) {
  cocktailApiService.searchQuery = e.target.dataset.name;
  await cocktailApiService.fetchIngredientsByName();
  if (cocktailApiService.ingredients[0].strIngredient === e.target.dataset.name)
    delModalCocktailClick();
  return renderModalIngredient(cocktailApiService.ingredients[0]);
  console.log('Сюда добавить модалку с пьяной кнопкой');
}
