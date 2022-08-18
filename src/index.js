import './sass/index.scss'



import CocktailApiService from './js/services/CocktailApiService'
// import { refs } from './js/services/refs';
// import { appendImagesContainerEl } from './js/markup/markup'

import headerTmp from './partials/gallery.hbs';

const array = ["a", "b", "c"];

console.log(headerTmp(array));



// export async function onContainerClick(e) {
//     const search = "Negroni"
//     cocktailApiService.searchQuery = search;
//     console.log(cocktailApiService.searchQuery);
//     await cocktailApiService.fetchCocktaileByName();
//     const { drinks } = cocktailApiService;

//     const array = []
//     for (let i = 0; i < 3; i++) {
//         const randomDrink = await cocktailApiService.fetchRandomCocktaile()
//         array.push(randomDrink[0]);
//     }

//     console.log(array);
//     appendImagesContainerEl(array, refs.ul)
// }

// refs.container.addEventListener('click', onContainerClick)


