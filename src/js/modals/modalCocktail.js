import CocktailApiService from '../services/CocktailApiService';
import { refs } from '../config/refs';
import { onBackdropClickWrapper, onEscKeyPressWrapper } from '../utils/onModalClose';

const { img, cocktailList, instructions, cocktailName } = refs.cocktail;
const cocktailApiService = new CocktailApiService();

refs.openModalCocktailBtn.addEventListener('click', onOpenModalCocktail);
refs.closeModalCocktailBtn.addEventListener('click', toggleModal);

console.log('openModalCocktailBtn', refs.openModalCocktailBtn);

async function onOpenModalCocktail(e) {
  console.log('onOpenModalCocktail');
  window.addEventListener('keydown', onEscKeyPressWrapper(refs.backdropCocktail));
  refs.backdropCocktail.addEventListener('click', onBackdropClickWrapper(refs.backdropCocktail));
  try {
    await cocktailApiService.fetchRandomCocktaile();
    console.log('randomDrink', cocktailApiService.randomDrink);
    await markupCocktail(cocktailApiService.randomDrink[0]);

    const dataType = e.target.getAttribute('data-type');
    if (dataType === 'open-learn-more') {
      refs.backdropCocktail.classList.toggle('visually-hidden');
    }
  } catch (err) {
    console.error(err);
  }
}

function toggleModal() {
  refs.backdropCocktail.classList.toggle('visually-hidden');
}

function markupCocktail(cocktail) {
  const { strDrinkThumb, strDrink, strInstructions } = cocktail;
  img.src = strDrinkThumb;
  cocktailName.innerHTML = strDrink;
  instructions.innerHTML = strInstructions;
  let ingredients = '';
  for (let i = 1; i <= 15; i += 1) {
    const ingredientKey = 'strIngredient' + i;
    const measureKey = 'strMeasure' + i;
    const ingredient = cocktail[ingredientKey];
    const measure = cocktail[measureKey];
    if (ingredient) {
      ingredients += `<li class='ingredient__item'><span class='ingredient__accent'>&#9733</span><span> ${measure || ''}</span> <a
            class='link ingredient-link' data-type='open-ingredient'>${ingredient}</a>
          </li>`;
    }
  }
  cocktailList.innerHTML = ingredients;
}


