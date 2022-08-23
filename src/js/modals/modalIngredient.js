// import { refs } from '../config/refs';
// import CocktailApiService from '../services/CocktailApiService';
// import {
//   onBackdropClickWrapper,
//   onEscKeyPressWrapper,
// } from '../utils/onModalClose';

// const cocktailApiService = new CocktailApiService();

// refs.openModalIngredientBtn.addEventListener('click', onOpenModalIngredient);
// refs.closeModalIngredientBtn.addEventListener('click', closeModal);

// refs.addIngredient.addEventListener('click', onAddIngredient);
// refs.removeIngredient.addEventListener('click', onRemoveIngredient);

// async function onOpenModalIngredient(e) {
//   window.addEventListener(
//     'keydown',
//     onEscKeyPressWrapper(refs.backdropIngredient)
//   );
//   refs.backdropIngredient.addEventListener(
//     'click',
//     onBackdropClickWrapper(refs.backdropIngredient)
//   );
//   const ingredientName = e.target.textContent;
//   try {
//     await cocktailApiService.fetchIngredientsByName(ingredientName);
//     if (cocktailApiService.ingredients)
//       await markupIngredient(cocktailApiService.ingredients[0]);

//     const dataType = e.target.getAttribute('data-type');

//     if (dataType === 'open-ingredient') {
//       toggleModal(refs.backdropCocktail);
//       toggleModal(refs.backdropIngredient);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// function closeModal(e) {
//   toggleModal(refs.backdropIngredient);
//   toggleModal(refs.backdropCocktail);
// }

// function toggleModal(element) {
//   element.classList.toggle('visually-hidden');
// }

// function markupIngredient(ingredient) {
//   const {
//     strIngredient: name,
//     strType: type,
//     strDescription: description,
//     strABV: degree,
//     strAlcohol: question,
//   } = ingredient;
//   const markup = `<h2 class='ingredient__name'>${name}</h2>
//         <h3 class='ingredient__title view'>${type || ''}</h3>
//         <div class='line'></div>
//         <p class='description__text'><span class='accent__text'>${name} </span>${
//     description?.replace(name, '') || 'No description'
//   }</p>
//         <ul class='characteristic'>
//             <li class='ingredient__item'><span class='ingredient__accent'>&#9733</span><span> Type:</span> ${
//               name || '-'
//             }</li>
//             <li class='ingredient__item'><span class='ingredient__accent'>&#9733</span><span> Alcoholic:</span> ${
//               question || ''
//             }
//             </li>
//             <li class='ingredient__item'><span class='ingredient__accent'>&#9733</span><span> Alcohol content:</span>
//               ${degree ? degree + '%' : '-'}
//             </li>
//           </ul>`;

//   refs.ingredientRef.innerHTML = markup;
// }

// function onAddIngredient(e) {
//   if (e.target.textContent === 'Add to favorite') {
//     refs.addIngredient.classList.add('visually-hidden');
//     refs.removeIngredient.classList.remove('visually-hidden');
//   }
// }

// function onRemoveIngredient(e) {
//   if (e.target.textContent === 'Remove from favorite') {
//     refs.addIngredient.classList.remove('visually-hidden');
//     refs.removeIngredient.classList.add('visually-hidden');
//   }
// }
