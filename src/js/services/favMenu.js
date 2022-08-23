import { refs } from '../config/refs';
import { renderCards } from './renderCards';
import { renderFavIngredients } from '../favourites/renderFavorites';

refs.fav.addEventListener('click', e => {
  console.log('qwe');
  if (refs.favList.classList.contains('visually-hidden')) {
    refs.favList.classList.add('visually-hidden');
    return;
  }
  refs.favList.classList.remove('visually-hidden');
});

refs.favCockBtn.addEventListener('click', onFavoriteCocktailClick);

refs.favIngrBtn.addEventListener('click', onFavoriteIngredientClick);

async function onFavoriteCocktailClick() {
  //Вставить массив ниже  и удалить эту строку
  renderCards();
  //Вставить массив выше  и удалить эту строку
  refs.runawayBtn.style.display = 'none';
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite cocktails';
  refs.favList.classList.add('visually-hidden');
}


async function onFavoriteIngredientClick() {
  //Вставить массив ниже  и удалить эту строку
  renderFavIngredients();
  //Вставить массив выше  и удалить эту строку
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite ingridiens';
  refs.favList.classList.add('visually-hidden');
}
