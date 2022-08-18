(function modalAlcohol() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('visually-hidden');
  }
})();

// (function madalIngridient() {
//   const refs = {
//     openModalBtn: document.querySelector('[data-modal-two-open]'),
//     closeModalBtn: document.querySelector('[data-modal-two-close]'),
//     modal: document.querySelector('[data-modal-two]'),
//   };
//
//   refs.openModalBtn.addEventListener('click', toggleModalTwo);
//   refs.closeModalBtn.addEventListener('click', toggleModalTwo);
//
//   function toggleModalTwo() {
//     refs.modal.classList.toggle('visually-hidden');
//   }
// })();