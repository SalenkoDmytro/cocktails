import CocktailApiService from '../services/CocktailApiService';
import { refs } from '../config/refs';
import {
  onBackdropClickWrapper,
  onEscKeyPressWrapper,
} from '../utils/onModalClose';
import { renderModalCocktail } from './renderModalCocktail';

const cocktailApiService = new CocktailApiService();

refs.openModalCocktailBtn.addEventListener('click', onOpenModalCocktail);

async function onOpenModalCocktail(e) {
  if (e.target.dataset.type !== 'open-learn-more') return;
  refs.backdropCocktail.classList.remove('visually-hidden');

  cocktailApiService.searchQuery = e.target.dataset.id;
  await cocktailApiService.fetchCocktailById();

  renderModalCocktail(cocktailApiService.drinks[0]);
  const closeBtn = document.querySelector('[data-modal-close-cocktail]');
  addListeners(closeBtn);
}

function onCloseBtnClick(e) {
  if (e.target.dataset.modal !== 'close-cocktail') return;
  refs.backdropCocktail.classList.add('visually-hidden');
  removeListeners();
}

function addListeners() {
  refs.backdropCocktail.addEventListener('click', onCloseBtnClick);
  document.addEventListener(
    'keydown',
    onEscKeyPressWrapper(refs.backdropCocktail)
  );
  refs.backdropCocktail.addEventListener(
    'click',
    onBackdropClickWrapper(refs.backdropCocktail)
  );
}

function removeListeners() {
  refs.backdropCocktail.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener(
    'keydown',
    onEscKeyPressWrapper(refs.backdropCocktail)
  );
  refs.backdropCocktail.removeEventListener(
    'click',
    onBackdropClickWrapper(refs.backdropCocktail)
  );
}
