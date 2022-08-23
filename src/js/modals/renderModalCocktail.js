import { refs } from '../config/refs';
import * as icon from './../../images/icons.svg';

export function renderModalCocktail(data) {
  const { strDrinkThumb, strDrink, strInstructions, idDrink } = data;

  const markup = `  <div class='modal__cocktail'>
    <div class='cocktail__wrap'>
      <div class='modal__wrap'>
        <img class='cocktail__img' alt='${strDrink}' src="${strDrinkThumb}" loading='lazy'/>
        <div class='cocktail__wrap'>
          <h2 class='cocktail__name'>${strDrink}</h2>
          <h3 class='cocktail__title'>Ingredients</h3>
          <p class='cocktail__text'>Per cocktail</p>

          <ul class='ingredient js-open-modal-ingredient'>${renderIngredients(
            data
          )}</ul>
        </div>
        <button type='button' class='btn--close' data-modal="close-cocktail">
          <svg width='32' height='32' data-modal="close-cocktail">
            <use href='${icon}#icon-close' data-modal="close-cocktail"></use>
          </svg>
        </button>
      </div>

      <div class='recipe__wrap'>
        <h4 class='recipe__title'>Instructions:</h4>
        <p class='recipe__text'>${strInstructions}</p>
      </div>
    </div>
    <div class='cocktail__modal-btn'>
      <button type='button' class='modal__btn' data-add-cocktail data-id="${idDrink}">Add to favorite</button>
      <button type='button' class='modal__btn visually-hidden' data-remove-cocktail data-id="${idDrink}>Remove from favorite</button>
    </div>
  </div>
`;
  refs.backdropCocktail.insertAdjacentHTML('beforeend', markup);
}

function renderIngredients(data) {
  let markup = '';
  for (let i = 0; i < 15; i += 1) {
    if (data['strIngredient' + i]) {
      markup += `<li class='ingredient__item'><span class='ingredient__accent'>&#9733</span><span>${
        data['strMeasure' + i] || ''
      }</span> <a
            class='link ingredient-link' data-type='open-ingredient'>${
              data['strIngredient' + i]
            }</a>
          </li>`;
    }
  }
  return markup;
}
