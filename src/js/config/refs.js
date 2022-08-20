export const refs = {
  buttonLogin: document.querySelector('.js-btn-login'),
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
};

