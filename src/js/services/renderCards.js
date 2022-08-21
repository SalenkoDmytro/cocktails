import { refs } from '../config/refs';

export function renderCards(data) {
  return data.map(data => {
    return `<li class="gallery__list-item card-set-item"  data-id="" data-cocktail="" data-ingredient="">
        <img
          class="gallery__img"
          src="./images/gallery/vampiro__lg.jpg"
          alt="Negroni cocktail"
          loading="lazy"
        />
        <p class="gallery__list-name">Negroni</p>
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
