import { refs } from '../config/refs';
import { renderCards } from './renderCards';
import { renderFavIngredients } from '../favourites/renderFavorites';
import { renderRunawayBtn } from './runawayBtn';
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebaseConfig';



const app = initializeApp(firebaseConfig);
const db = getDatabase();

refs.fav.addEventListener('click', e => {
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
  await markUpCocktails()
  // renderCards();
  //Вставить массив выше  и удалить эту строку
  renderRunawayBtn();
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite cocktails';
  refs.favList.classList.add('visually-hidden');
}

async function onFavoriteIngredientClick() {
  //Вставить массив ниже  и удалить эту строку
  await markUpIngredients()
  // renderFavIngredients();
  //Вставить массив выше  и удалить эту строку
  renderRunawayBtn();
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite ingridiens';
  refs.favList.classList.add('visually-hidden');
}


function markUpCocktails() {
  const auth = JSON.parse(localStorage.getItem("user") || null);
  if (!auth) {
    return;
  }
  onValue(ref(db, `users/` + `id:${auth.uid}` + '/cocktails'), snapshot => {
    const dataDb = snapshot.val();
    if (!dataDb) return;
    renderCards(dataDb);
  });
}


function markUpIngredients() {
  const auth = JSON.parse(localStorage.getItem("user") || null);
  if (!auth) {
    return;
  }
  onValue(ref(db, `users/` + `id:${auth.uid}` + '/ingredients'), snapshot => {
    const dataDb = snapshot.val();
    if (!dataDb) return;
    renderFavIngredients(dataDb);
  });
}
