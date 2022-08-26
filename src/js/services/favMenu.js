import { refs } from '../config/refs';
import { renderCards } from './renderCards';
import { renderFavIngredients } from '../favourites/renderFavorites';
import { renderRunawayBtn } from './runawayBtn';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebaseConfig';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
  //Вставить массив ниже  и удалить эту строку
  markUpCocktails();
  // renderCards();
  //Вставить массив выше  и удалить эту строку
  renderRunawayBtn();
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite cocktails';
  refs.favList.classList.add('visually-hidden');
}

async function onFavoriteIngredientClick() {
  //Вставить массив ниже  и удалить эту строку
  markUpIngredients();
  // renderFavIngredients();
  //Вставить массив выше  и удалить эту строку
  renderRunawayBtn();
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite ingridiens';
  refs.favList.classList.add('visually-hidden');
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
        // const responce = await axios.get(
        //   `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${el}`
        // );
        return responce;
      });
      const result = await Promise.all(allData);
      renderFavIngredients(result);
    }
  );
}

export function needLoginFavCock() {
  const auth = JSON.parse(localStorage.getItem("user") || null);
  if (auth === null) {
    Notify.failure('Error. Please login to get your favorite cocktails');
    refs.favList.classList.add('visually-hidden');
  } else {
    onFavoriteCocktailClick();
  }
}

export function needLogInFavIngrid() {
  const auth = JSON.parse(localStorage.getItem("user") || null);
  if (auth === null) {
    Notify.failure('Error. Please login to get your favorite ingridients');
    refs.favList.classList.add('visually-hidden');
  } else {
    onFavoriteIngredientClick();
  }
}

refs.menuFavCock.addEventListener('click', needLoginMenuFavCock);
refs.manuFavIngrid.addEventListener('click', needLogInMenuFavIngrid);

export function needLoginMenuFavCock() {
  const auth = JSON.parse(localStorage.getItem("user") || null);
  if (auth === null) {
    Notify.failure('Error. Please login to get your favorites');
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
  } else {
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
    onFavoriteCocktailClick();
  }
}

export function needLogInMenuFavIngrid() {
  const auth = JSON.parse(localStorage.getItem("user") || null);
  if (auth === null) {
    Notify.failure('Error. Please login to get your favorites');
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
  } else {
    refs.mobMenu.classList.add('visually-hidden');
    refs.menuBtn.classList.toggle('is-active');
    onFavoriteIngredientClick();
  }
}