import { refs } from '../config/refs';
import { cardsQuantity } from '../services/renderCards';

export function renderFavIngredients(array = []) {
  refs.gallery.innerHTML = '';
  const render = cardsQuantity(createFavIngMarkup(array));
  refs.gallery.insertAdjacentHTML('beforeend', render);
}

function createFavIngMarkup(data) {
  return data.map(({ idIngredient, strIngredient, strType }) => {
    return `<li class="fav-ing__list-item card-set-item">
        <p class="fav-ing__list-name">${strIngredient}</p>
        <p class="fav-ing__list-type">${strType}</p>
        <div class="fav-ing__btn-container">
          <button class="fav-ing__btn fav-ing__btn-more" type="button">
            Learn more
          </button>
          <button class="fav-ing__btn fav-ing__btn-fav" type="button" data-id="${idIngredient}" data-favorite="ingredient">
            Remove
            <svg width="16" height="14">
              <use class="fav-ing__btn-fav-svg" href="./images/icons.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
      </li>`;
  });
}
