(() => {
  const refs = {
    openModalBtnSignIn: document.querySelector('.js-btn-login'),
    closeModalBtnSignIn: document.querySelector('.modal__close-btn'),
    modal: document.querySelector('.js-data-mod'),
  };

  refs.openModalBtnSignIn.addEventListener('click', toggleModal);
  refs.closeModalBtnSignIn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('visually-hidden');
    console.log(refs.modal);
  }
})();
