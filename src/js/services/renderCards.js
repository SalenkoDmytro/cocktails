import { refs } from '../config/refs';

export function createMarkup(data) {
  return data.map(({ strDrink, strDrinkThumb, idDrink }) => {
    return `<li class="gallery__list-item card-set-item"  data-id="${idDrink}" data-cocktail="${true}" data-ingredient="${false}">
        <img
          class="gallery__img"
          src="${strDrinkThumb}"
          alt="${strDrink}"
          loading="lazy"
        />
        <p class="gallery__list-name">${strDrink}</p>
        <div class="gallery__btn-container">
          <button
            class="gallery__btn gallery__btn-more"
            type="button"
            data-type="open-learn-more"
          >
            Learn more
          </button>
          <button class="gallery__btn gallery__btn-fav" type="button">
            Add to
            <svg width="16" height="14">
              <use
                class="gallery__btn-fav-svg"
                href="./images/icons.svg#icon-heart"
              ></use>
            </svg>
          </button>
        </div>
      </li>`;
  });
}

export function noResultRender() {
  refs.gallery.innerHTML = '';
  const markup = ` <div class="container sorry ">
    <h2 class="sorry__title">Sorry, we didn't find any cocktail for you</h2>
    <div class="sorry__picture">
      <picture>
        <source
          srcset="./images/group/grouptab.png, ./images/group/groupxtab.png 2x"
          media="(min-width: 768px)"
        />

        <source
          srcset="
            ./images/group/groupmob.png  1x,
            ./images/group/groupxmob.png 2x
          "
          media="(max-width: 767px)"
        />
        <img
          class="sorry__img"
          src="./images/group/groupmob.png"
          alt="group"
          loading="lazy"
        />
      </picture>
    </div>
  </div>`;
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export function cardsQuantity(markup) {
  if (window.screen.width < 768) {
    const render = markup.filter((el, i) => i <= 2);
    return render.join('');
  } else if (window.screen.width >= 768 && window.screen.width < 1280) {
    const render = markup.filter((el, i) => i <= 5);
    return render.join('');
  }
  const render = markup.filter((el, i) => i <= 8);
  return render.join('');
}

export function renderCards(data) {
  refs.gallery.innerHTML = '';
  const render = cardsQuantity(createMarkup(data));
  refs.gallery.insertAdjacentHTML('beforeend', render);
}
