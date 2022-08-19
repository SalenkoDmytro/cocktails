const refs = {
  openModalBtn: document.querySelector('.js-open-modal-ingredient'),
  closeModalBtn: document.querySelector('[data-modal-close-ingredient]'),
  backdropIngredient: document.querySelector('[data-bg-ingredient]'),
  backdropCocktail: document.querySelector('[data-bg-cocktail]'),
};

refs.openModalBtn.addEventListener('click', onOpenModalIngredient);
refs.closeModalBtn.addEventListener('click', closeModal);

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