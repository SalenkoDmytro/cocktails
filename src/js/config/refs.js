export const refs = {
  body: document.querySelector('body'),

  buttonLogin: document.querySelector('.js-btn-login'),
  closeModalBtnSignIn: document.querySelector('.js-btn-close-login'),
  modalSignIn: document.querySelector('.js-data-mod'),

  openMenuBtn: document.querySelector('[data-menu-open]'),
  closeMenuBtn: document.querySelector('[data-menu-close]'),
  menu: document.querySelector('[data-menu]'),

  runawayBtn: document.querySelector('#runaway-btn'),
  openModalCocktailBtn: document.querySelector('.js-open-modal-cocktail'),
  closeModalCocktailBtn: document.querySelector('[data-modal-close-cocktail]'),
  backdropCocktail: document.querySelector('[data-bg-cocktail]'),
  openModalIngredientBtn: document.querySelector('.js-open-modal-ingredient'),
  closeModalIngredientBtn: document.querySelector(
    '[data-modal-close-ingredient]'
  ),
  backdropIngredient: document.querySelector('[data-bg-ingredient]'),
  cocktail: {
    img: document.querySelector('.cocktail__img'),
    cocktailName: document.querySelector('.cocktail__name'),
    instructions: document.querySelector('.recipe__text'),
    cocktailList: document.querySelector('.ingredient'),
  },
  ingredientRef: document.querySelector('.ingredient__wrap'),
  addCocktail: document.querySelector('[data-add-cocktail]'),
  removeCocktail: document.querySelector('[data-remove-cocktail]'),
  addIngredient: document.querySelector('[data-add-ingredient]'),
  removeIngredient: document.querySelector('[data-remove-ingredient]'),

  openModalTeam: document.querySelector('.js-modal-open-team'),
  closeBtnModalTeam: document.querySelector('.js-modal-team-close'),
  backdropModalTeam: document.querySelector('.js-modal-team'),

  lettersList: document.querySelector('.hero__list'),
  form: document.querySelector('.header__search-wrapper'),
  input: document.querySelector('.header__search-input'),
  lettersListMobile: document.querySelector('.select__list'),
  selectLetter: document.querySelector('#select'),
  inputMobile: document.querySelector('.select__input'),
  inputSpan: document.querySelector('.input-span'),
  gallery: document.querySelector('.gallery__list'),
  cardFavBtn: document.querySelector('.js-btn-fav'),

  header: document.querySelector('.header'),
  fav: document.querySelector('.fav__select-input'),
  favList: document.querySelector('.fav__list'),
  favCockBtn: document.querySelector('.js-btn-fav-cock'),
  favIngrBtn: document.querySelector('.js-btn-fav-ingr'),

  sectionHero: document.querySelector('.section-hero'),
  galleryTitle: document.querySelector('.gallery__title'),

  toTopBtn: document.querySelector('.back-to-top'),

  mobMenu: document.querySelector('.backdrop__mobile'),
  menuFavCock: document.querySelector('.js-menu-btn-fav-cock'),
  manuFavIngrid: document.querySelector('.js-menu-btn-fav-ingr'),
  menuBtn: document.querySelector('[data-menu-toggle]'),
  menuForm: document.querySelector('.menu__search-wrapper'),
  menuInput: document.querySelector('.menu__search-input'),
};
