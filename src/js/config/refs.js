export const refs = {
  
  buttonLogin: document.querySelector('.js-btn-login'),
  closeModalBtnSignIn: document.querySelector('.js-btn-close-login'),
  modalSignIn: document.querySelector('.js-data-mod'),

  openMenuBtn: document.querySelector('[data-menu-open]'),
  closeMenuBtn: document.querySelector('[data-menu-close]'),
  menu: document.querySelector('[data-menu]'),

  openModalCocktailBtn: document.querySelector('.js-open-modal-cocktail'),
  closeModalCocktailBtn: document.querySelector('[data-modal-close-cocktail]'),
  backdropCocktail: document.querySelector('[data-bg-cocktail]'),
  openModalIngredientBtn: document.querySelector('.js-open-modal-ingredient'),
  closeModalIngredientBtn: document.querySelector('[data-modal-close-ingredient]'),
  backdropIngredient: document.querySelector('[data-bg-ingredient]'),
  cocktail: {
    img: document.querySelector('.cocktail__img'),
    cocktailName: document.querySelector('.cocktail__name'),
    instructions: document.querySelector('.recipe__text'),
    cocktailList: document.querySelector('.ingredient'),
  },
  ingredientRef: document.querySelector('.ingredient__wrap'),
  // characteristicIngredient: document.querySelector('.characteristic'),
  
  openModalTeam: document.querySelector('.js-modal-open-team'),
  closeBtnModalTeam: document.querySelector('.js-modal-team-close'),
  backdropModalTeam: document.querySelector('.js-modal-team'),
};

