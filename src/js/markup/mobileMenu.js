// mobileMenu.js
import { refs } from '../config/refs';

  refs.menuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.mobMenu.classList.toggle('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
  }

