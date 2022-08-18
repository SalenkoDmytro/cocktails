const refs = {
  openModalBtn: document.querySelector('.js-open-modal-cocktail'),
  closeModalBtn: document.querySelector('[data-modal-close-cocktail]'),
  backdrop: document.querySelector('[data-bg-cocktail]'),
};

refs.openModalBtn.addEventListener('click', onOpenModalCocktail);
refs.closeModalBtn.addEventListener('click', toggleModal);

function onOpenModalCocktail(e) {
  const dataType = e.target.getAttribute('data-type');
  if (dataType === 'open-learn-more') {
    refs.backdrop.classList.toggle('visually-hidden');
  }
}

function toggleModal() {
  refs.backdrop.classList.toggle('visually-hidden');
}