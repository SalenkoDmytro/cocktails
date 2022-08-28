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
import {
  addModalCocktailClick,
  delModalCocktailClick,
  addModalIngredientClick,
  delModalIngredientClick,
} from '../firebase/firebaseDb';
const debounce = require('lodash.debounce');
import { cardsQuantity } from '../services/renderCards';
import { quantityOnPage } from './renderCards'


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
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite cocktails';
  await markUpCocktails();
  refs.favList.classList.add('visually-hidden');
  refs.gallery.removeEventListener('click', onLearnMoreIngrClick);
}

async function onFavoriteIngredientClick() {
  refs.gallery.addEventListener('click', onLearnMoreIngrClick);
  refs.sectionHero.style.display = 'none';
  refs.galleryTitle.textContent = 'Favorite ingredients';
  refs.gallery.innerHTML = '';
  await markUpIngredients();
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
  addModalIngredientClick();
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
      if (!dataDb) {
        refs.gallery.innerHTML = '';
        return;
      }
      const allData = dataDb.map(async el => {
        cocktailApiService.searchQuery = el;
        await cocktailApiService.fetchCocktailById();
        return cocktailApiService.drinks;
      });
      const result = await Promise.all(allData);
      await renderCards(result.flat(1));
    }
  );
}


// const debounseScroll = debounce(infinityScroll, 100);


function markUpIngredients() {
  const auth = JSON.parse(localStorage.getItem('user') || null);
  if (!auth) {
    return;
  }
  let flag = false;
  cocktailApiService.resetPage();

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
      await renderFavIngredients(result);
      const onPage = quantityOnPage()
      if (result.length > onPage) {
        let res = 0;
        const nextResult = Math.ceil(result.length / onPage - 1);
        let leftCard = nextResult * onPage;
        window.addEventListener("scroll", debounce(infinityScroll => {
          const documentRect = document.documentElement.getBoundingClientRect();
          if (documentRect.bottom < document.documentElement.clientHeight + 300) {
            if (!(leftCard < onPage) && !flag) {
              leftCard = leftCard - onPage;
              cocktailApiService.incrementPage();
              res = cocktailApiService.page
              let array = result.slice(((res - 1) * onPage), res * onPage);

              let render = renderFavIngredients(array);
              if (render) {
                refs.gallery.insertAdjacentHTML('beforeend', render);
              }
            } else {
              flag = true;
            }
            // await renderFavIngredients(result.slice(onPage + 1, 2 * onPage));
          }
        }, 100))
      }
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
window.addEventListener('click', function (event) {
  if (event.target != refs.fav && event.target.parentNode != refs.fav) {
    refs.favList.classList.add('visually-hidden');
  }
});



function addListener() {
}


// async function infinityScroll(e) {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   try {
//     if (documentRect.bottom < document.documentElement.clientHeight + 300) {
//       if (!(pixabayApiService.hits.length < pixabayApiService.per_page) && !(pixabayApiService.totalHits <= imagesContainerEl.children.length)) {
//         pixabayApiService.incrementPage();
//         appendImagesContainerEl(pixabayApiService.hits, imagesContainerEl);

//       } else {
//         if ((!pixabayApiService.loading)) {
//           removeListener();
//           pixabayApiService.loading = true;
//           letMsgAllImagesLoaded();
//         }
//       };
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }


// import { userPromise } from '../firebase/firebaseDb'

// userPromise.then((user) => {
//   if (!user.hasFavoriteCocktailById(cocktailId)) {}
// }).catch(error => {
//   throw new Error(error.message)
// })
