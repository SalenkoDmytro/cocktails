import { refs } from '../config/refs';

refs.buttonLogin.addEventListener('click', toggleModalSignIn);
refs.closeModalBtnSignIn.addEventListener('click', toggleModalSignIn);

function toggleModalSignIn() {
  refs.modalSignIn.classList.toggle('visually-hidden');
  console.log('qwe');
}