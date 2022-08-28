import { refs } from '../config/refs';
import { cardsQuantity } from '../services/renderCards';
import * as icons from '../../images/icons.svg';


export function renderFavIngredients(array = []) {
  refs.gallery.innerHTML = '';
  const render = cardsQuantity(createFavIngMarkup(array));
  refs.gallery.insertAdjacentHTML('beforeend', render);
}

export function createFavIngMarkup(data) {
  let markupArray = [];
  let markup = '';
  let obj = data.flat(1);
  for (let i = 0; i < obj.length; i++) {
    if (!obj[i]) {
      continue;
    };
    const { idIngredient, strIngredient, strType } = obj[i] //data[0];

    markup = `<li class="fav-ing__list-item card-set-item">
      <div class="ing-card-wrap"><p class="fav-ing__list-name">${strIngredient}</p>
      <img class="ing-pict" src='https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png'
       alt=${strIngredient}></div>
        <p class="fav-ing__list-type">${strType}</p>
        <div class="fav-ing__btn-container">
          <button class="fav-ing__btn fav-ing__btn-more" type="button" data-id="${idIngredient}" data-type='open-ingredient'>
            Learn more
          </button>
          <button class="gallery__btn gallery__btn-fav js-btn-fav is-checked" type="button" data-id="${idIngredient}" data-type='open-ingredient' data-favorite="ingredient">
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
    markupArray.push(markup);
  }
  return markupArray;

  // return data.map(data => {
  //   if (!data) return;

  //   const { idIngredient, strIngredient, strType } = data[0];
  //   return `<li class="fav-ing__list-item card-set-item">
  //     <div class="ing-card-wrap"><p class="fav-ing__list-name">${strIngredient}</p>
  //     <img class="ing-pict" src='https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png'
  //      alt=${strIngredient}></div>
  //       <p class="fav-ing__list-type">${strType}</p>
  //       <div class="fav-ing__btn-container">
  //         <button class="fav-ing__btn fav-ing__btn-more" type="button" data-id="${idIngredient}" data-type='open-ingredient'>
  //           Learn more
  //         </button>
  //         <button class="gallery__btn gallery__btn-fav js-btn-fav is-checked" type="button" data-id="${idIngredient}" data-type='open-ingredient' data-favorite="ingredient">
  //           <span class="js-btn-gallery-text">Remove</span>
  //           <svg width="16" height="14" data-favorite class="gallery__btn-fav-svg is-checked">
  //             <use
  //               class="gallery__btn-fav-svg"
  //               href="${icons}#icon-heart"
  //             ></use>
  //           </svg>
  //         </button>
  //       </div>
  //     </li>`;
  // });
}

