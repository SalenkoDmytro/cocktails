import CocktailApiService from '../services/CocktailApiService';
import { refs } from '../config/refs';
import { onBackdropClickWrapper, onEscKeyPressWrapper } from '../utils/onModalClose';

const { img, cocktailList, instructions, cocktailName } = refs.cocktail;
const cocktailApiService = new CocktailApiService();

refs.openModalCocktailBtn.addEventListener('click', onOpenModalCocktail);
refs.closeModalCocktailBtn.addEventListener('click', toggleModal);

async function onOpenModalCocktail(e) {
  window.addEventListener('keydown', onEscKeyPressWrapper(refs.backdropCocktail));
  refs.backdropCocktail.addEventListener('click', onBackdropClickWrapper(refs.backdropCocktail));
  const cocktail = await cocktailApiService.fetchRandomCocktaile();
  await markupCocktail(cocktail);

  const dataType = e.target.getAttribute('data-type');
  if (dataType === 'open-learn-more') {
    refs.backdropCocktail.classList.toggle('visually-hidden');
  }
}

function toggleModal() {
  refs.backdropCocktail.classList.toggle('visually-hidden');
}

function markupCocktail(cocktail) {
  img.src = cocktail[0].strDrinkThumb;
  cocktailName.innerHTML = cocktail[0].strDrink;
  instructions.innerHTML = cocktail[0].strInstructions;
  let ingredients = '';
  for (let i = 1; i <= 15; i += 1) {
    const ingredientKey = 'strIngredient' + i;
    const measureKey = 'strMeasure' + i;
    const ingredient = cocktail[0][ingredientKey];
    const measure = cocktail[0][measureKey];
    if (ingredient) {
      ingredients += `<li class='ingredient__item'><span class='ingredient__accent'>&#9733</span><span>${measure}</span> <a
            class='link ingredient-link' data-type='open-ingredient'>${ingredient}</a>
          </li>`;
    }
  }
  cocktailList.innerHTML = ingredients;
}


