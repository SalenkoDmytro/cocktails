import { refs } from '../config/refs';

refs.openModalIngredientBtn.addEventListener('click', onOpenModalIngredient);
refs.closeModalIngredientBtn.addEventListener('click', closeModal);

function onOpenModalIngredient(e) {
  const dataType = e.target.getAttribute('data-type');
  e.preventDefault()
  if (dataType === 'open-ingredient') {
    toggleModal(refs.backdropCocktail)
    toggleModal(refs.backdropIngredient)

  }
}

function closeModal(e) {
  toggleModal(refs.backdropIngredient)
}

function toggleModal(element) {
  element.classList.toggle('visually-hidden');
}