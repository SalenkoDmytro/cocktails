import { refs } from '../config/refs';


refs.fav.addEventListener('click', e => {
    console.log('qwe');
  if (!favList.classList.contains('visually-hidden')) {
    favList.classList.add('visually-hidden');
    return;
  }
  favList.classList.remove('visually-hidden');
});