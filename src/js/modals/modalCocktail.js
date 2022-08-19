import CocktailApiService from '../services/CocktailApiService';
import { refs } from '../config/refs';

const cocktailApiService = new CocktailApiService();

refs.openModalCocktailBtn.addEventListener('click', onOpenModalCocktail);
refs.closeModalCocktailBtn.addEventListener('click', toggleModal);

async function onOpenModalCocktail(e) {
  const cocktail = await cocktailApiService.fetchRandomCocktaile();
  console.log(cocktail);
  const dataType = e.target.getAttribute('data-type');
  if (dataType === 'open-learn-more') {
    refs.backdropCocktail.classList.toggle('visually-hidden');
  }
}

function toggleModal() {
  refs.backdropCocktail.classList.toggle('visually-hidden');
}