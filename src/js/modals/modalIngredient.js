import { refs } from '../config/refs';
import CocktailApiService from '../services/CocktailApiService';
import { onBackdropClickWrapper, onEscKeyPressWrapper } from '../utils/onModalClose';

const cocktailApiService = new CocktailApiService();

refs.openModalIngredientBtn.addEventListener('click', onOpenModalIngredient);
refs.closeModalIngredientBtn.addEventListener('click', closeModal);

async function onOpenModalIngredient(e) {
  window.addEventListener('keydown', onEscKeyPressWrapper(refs.backdropIngredient));
  refs.backdropIngredient.addEventListener('click', onBackdropClickWrapper(refs.backdropIngredient));
  const ingredientName = e.target.textContent;
  await cocktailApiService.fetchIngredientsByName(ingredientName);
  await markupIngredient(cocktailApiService.ingredients[0]);

  const dataType = e.target.getAttribute('data-type');

  if (dataType === 'open-ingredient') {
    toggleModal(refs.backdropCocktail);
    toggleModal(refs.backdropIngredient);
  }
}

function closeModal(e) {
  toggleModal(refs.backdropIngredient);
  toggleModal(refs.backdropCocktail);
}

function toggleModal(element) {
  element.classList.toggle('visually-hidden');
}

function markupIngredient(ingredient) {
  console.log(ingredient);
  const { strIngredient: name, strType: type = '', strDescription: description } = ingredient;


  const markup = `<h2 class='ingredient__name'>${name}</h2>
        <h3 class='ingredient__title view'>${type}</h3>
        <div class='line'></div>
        <p class='description__text'><span class='accent__text'>${name} </span>${description?.replace(name, '') || 'No description'}</p>`;

  refs.ingredientRef.innerHTML = markup;
}
