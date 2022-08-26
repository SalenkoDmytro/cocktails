import { refs } from '../config/refs';
import { cardsQuantity } from '../services/renderCards';
import * as icons from '../../images/icons.svg';


export function renderFavIngredients(array = []) {
  refs.gallery.innerHTML = '';
  const render = cardsQuantity(createFavIngMarkup(array));
  refs.gallery.insertAdjacentHTML('beforeend', render);
}

function createFavIngMarkup(data) {
  return data.map((data) => {
    const { idIngredient, strIngredient, strType } = data[0];
    return `<li class="fav-ing__list-item card-set-item">
        <p class="fav-ing__list-name">${strIngredient}</p>
        <p class="fav-ing__list-type">${strType}</p>
        <div class="fav-ing__btn-container">
          <button class="fav-ing__btn fav-ing__btn-more" type="button">
            Learn more
          </button>
          <button class="gallery__btn gallery__btn-fav js-btn-fav is-checked" type="button" data-id="${idIngredient}" data-favorite="ingredient">
            <span class="js-btn-gallery-text">Remove</span>
            <svg width="16" height="14" data-favorite class="gallery__btn-fav-svg is-checked">
              <use
                class="gallery__btn-fav-svg"
                href="${icons}#icon-heart"
              ></use>
            </svg>
          </button>
        </div>
      </li>`;
  });
}
