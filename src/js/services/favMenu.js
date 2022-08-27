import { refs } from '../config/refs';
import { renderCards } from './renderCards';
import { renderFavIngredients } from '../favourites/renderFavorites';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebaseConfig';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyConfigs } from './../config/notify';
import { addListeners, removeListeners } from '../modals/modals';
import { renderModalIngredient } from '../modals/renderModal';
import CocktailApiService from './CocktailApiService';

const cocktailApiService = new CocktailApiService();
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const axios = require('axios');

refs.fav.addEventListener('click', e => {
  if (refs.favList.classList.contains('visually-hidden')) {
    refs.favList.classList.add('visually-hidden');
    return;
  }
  refs.favList.classList.remove('visually-hidden');
});

refs.favCockBtn.addEventListener('click', needLoginFavCock);
refs.favIngrBtn.addEventListener('click', needLogInFavIngrid);

async function onFavoriteCocktailClick() {
  markUpCocktails();
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite cocktails';
  refs.favList.classList.add('visually-hidden');
  refs.gallery.removeEventListener('click', onLearnMoreIngrClick);
}

async function onFavoriteIngredientClick() {
  markUpIngredients();
  refs.gallery.addEventListener('click', onLearnMoreIngrClick);
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite ingredients';
  refs.favList.classList.add('visually-hidden');
}

async function onLearnMoreIngrClick(e) {
  if (e.target.dataset.type !== 'open-ingredient') return;
  try {
    cocktailApiService.searchQuery = e.target.dataset.id;
    await cocktailApiService.fetchIngredientById();
    refs.backdropCocktail.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error.message);
  }
  addListeners();
  renderModalIngredient(cocktailApiService.ingredients[0]);
  return;
}

async function markUpCocktails() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (!auth) {
    return;
  }
  onValue(
    ref(db, `users/` + `id:${auth.uid}` + '/cocktails'),
    async snapshot => {
      const dataDb = snapshot.val();
      if (!dataDb) return;
      const allData = dataDb.map(async el => {
        cocktailApiService.searchQuery = el;
        await cocktailApiService.fetchCocktailById();
        return cocktailApiService.drinks;
      });

      const result = await Promise.all(allData);
      renderCards(result.flat(1));
    }
  );
}

function markUpIngredients() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (!auth) {
    return;
  }
  onValue(
    ref(db, `users/` + `id:${auth.uid}` + '/ingredients'),
    async snapshot => {
      const dataDb = snapshot.val();
      if (!dataDb) {
        refs.gallery.innerHTML = '';
        return;
      }

      const allData = dataDb.map(async el => {
        cocktailApiService.searchQuery = el;
        await cocktailApiService.fetchIngredientById();
        return cocktailApiService.ingredients;
      });
      const result = await Promise.all(allData);
      renderFavIngredients(result);
    }
  );
}

export function needLoginFavCock() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (auth === null) {
    Notify.info('Please login to get your favorite cocktails', notifyConfigs);
    refs.favList.classList.add('visually-hidden');
  } else {
    onFavoriteCocktailClick();
  }
}

export function needLogInFavIngrid() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (auth === null) {
    Notify.info('Please login to get your favorite ingridients', notifyConfigs);
    refs.favList.classList.add('visually-hidden');
  } else {
    onFavoriteIngredientClick();
  }
}

refs.menuFavCock.addEventListener('click', needLoginMenuFavCock);
refs.manuFavIngrid.addEventListener('click', needLogInMenuFavIngrid);

export function needLoginMenuFavCock() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (auth === null) {
    Notify.info('Please login to get your favorites', notifyConfigs);
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
  } else {
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
    onFavoriteCocktailClick();
  }
}

export function needLogInMenuFavIngrid() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (auth === null) {
    Notify.info('Please login to get your favorites', notifyConfigs);
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
  } else {
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
    onFavoriteIngredientClick();
  }
}


// closing favMenu by clicking window
window.addEventListener('click', function(event){
	if (event.target != refs.fav){
    refs.favList.classList.add('visually-hidden');
    }
});