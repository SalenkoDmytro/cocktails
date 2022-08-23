import { refs } from '../config/refs';


refs.fav.addEventListener('click', e => {
    console.log('qwe');
  if (refs.favList.classList.contains('visually-hidden')) {
    refs.favList.classList.add('visually-hidden');
    return;
  }
  refs.favList.classList.remove('visually-hidden');
});

refs.favCockBtn.addEventListener('click', () => {

  //   refs.header.style.backgroundColor = '#D9D9D9';
       refs.openModalCocktailBtn.style.display = 'none';
       refs.runawayBtn.style.display = 'none';
       refs.sectionHero.style.display = 'none';
       refs.galleryTitle.textContent = 'Favorite cocktails';
       refs.favList.classList.add('visually-hidden');
   
   });
 
 
   refs.favIngrBtn.addEventListener('click', () => {
    
       refs.openModalCocktailBtn.style.display = 'none';
       refs.runawayBtn.style.display = 'none';
       refs.sectionHero.style.display = 'none';
       refs.galleryTitle.textContent = 'Favorite ingridiens';
       refs.favList.classList.add('visually-hidden');
   
   });