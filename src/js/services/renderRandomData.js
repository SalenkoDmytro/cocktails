import CocktailApiService from './CocktailApiService';
const cocktailApiService = new CocktailApiService();

export default async function renderRandomData(quantity = 9) {
  const array = [];

  for (let i = 0; i < quantity; i += 1) {
    await cocktailApiService.fetchRandomCocktaile();
    array.push(...cocktailApiService.randomDrink);
  }

  checkUniqueId(array);
  return array;
}

function checkUniqueId(arr) {
  const idOfCocktails = [...new Set(arr.map(el => el.idDrink))];
  if (idOfCocktails.length < 9) {
    return renderRandomData();
  }
}
