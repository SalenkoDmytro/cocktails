import CocktailApiService from './CocktailApiService';
const cocktailApiService = new CocktailApiService();

export default async function renderRandomData(quantity = 9) {
  const arrayOfPromises = [];
  for (let i = 0; i < quantity; i += 1) {
    const responce = await cocktailApiService.fetchRandomCocktaile();
    arrayOfPromises.push(...responce);
  }
  const result = await Promise.all(arrayOfPromises);
  return result;
}
