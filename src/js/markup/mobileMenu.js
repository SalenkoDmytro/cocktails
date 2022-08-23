// mobileMenu.js
(() => {
  const refs = {
    body: document.querySelector('body'),
    menuBtn: document.querySelector('[data-menu-toggle]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.menuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    refs.menuBtn.classList.toggle('is-active');
  }
})();
