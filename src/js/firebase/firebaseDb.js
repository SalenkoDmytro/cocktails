import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove, onValue, child } from "firebase/database";
import { firebaseConfig } from '../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

import { refs } from "../config/refs"
import UserManager from '../drinkingUser/managerUser'
import DrinkingUser from '../drinkingUser/createUser';

export const userManager = new UserManager(db);


export async function isFavoriteCocktailsById(idDrink) {
    const auth = JSON.parse(localStorage.getItem("user") || null);
    let isCheck = 0;
    if (!auth) {
        return;
    }
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/` + `id:${auth.uid}` + `/cocktails/`)).then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
            isCheck = data.includes(idDrink);
            if (isCheck) {
                localStorage.setItem("favoriteCocktail", idDrink);
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export async function isFavoriteIngredients(idIngredient) {
    const auth = JSON.parse(localStorage.getItem("user") || null);
    let isCheck = 0;
    if (!auth) {
        return;
    }
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/` + `id:${auth.uid}` + `/ingredients/`)).then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
            isCheck = data.includes(idIngredient);
            if (isCheck) {
                localStorage.setItem("favoriteIngredient", idIngredient);
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


export function getDataFromFirebase() {
    const auth = JSON.parse(localStorage.getItem("user") || null);
    if (!auth) {
        return;
    }
    const cocktail = ref(db, `users/` + `id:${auth.uid}` + '/cocktails');
    const ingredient = ref(db, `users/` + `id:${auth.uid}` + '/ingredients');

    onValue(cocktail, snapshot => {
        const dataDb = snapshot.val();
        dataDb ? (cocktails = Object.values(dataDb)) : (cocktails = false);
        console.log("🚀 ~ getDataFromFirebase ~ cocktail", cocktails)
    });
    onValue(ingredient, snapshot => {
        const dataDb = snapshot.val();
        dataDb ? (ingredients = Object.values(dataDb)) : (ingredients = false);
        console.log("🚀 ~ getDataFromFirebase ~ ingredient", ingredients)
    });
}


//Додаємо і знімаємо події
export function addListenerAfterLogIn() {
    listFavCocktailGallery.addEventListener("click", onBtnFavCocktailGalleryClick);
}

export function delListenerAfterLogOut() {
    listFavCocktailGallery.removeEventListener("click", onBtnFavCocktailGalleryClick);
}

export function addListenerAuthLogOut() {
    listFavCocktailGallery.addEventListener("click", onBtnFavAfterLogOutCocktailGalleryClick);
}

export function delListenerAuthLogOut() {
    listFavCocktailGallery.removeEventListener("click", onBtnFavAfterLogOutCocktailGalleryClick);
}


export function onBtnFavAfterLogOutCocktailGalleryClick(e) {
    e.preventDefault();
    const favoriteBtn = e.target.hasAttribute("data-favorite")
    if (!favoriteBtn) {
        return;
    }
    console.log("Потрібно залогінитись");
}

export function delBtnFavoriteClassChecked() {
    const isCheckedArrayBtns = document.querySelectorAll(".is-checked")
    isCheckedArrayBtns.forEach(el => el.classList.remove('is-checked'))
}

const btnListCocktail = document.querySelectorAll('.js-btn-fav');
const btnListIngredients = document.querySelectorAll('[data-favorite=ingredient]');

//TODO *************************************************************************************
//!клік по кнопці додати до улюблених коктейлів в галереї
const listFavCocktailGallery = document.querySelector('[data-gallery-cocktail]');
async function onBtnFavCocktailGalleryClick(e) {
    e.preventDefault();


    const favoriteBtn = e.target.closest(".js-btn-fav")

    if (!favoriteBtn) {
        return;
    }

    const text = favoriteBtn.classList.contains("is-checked") ? "Add to" : "Remove ";
    favoriteBtn.children[0].textContent = text;

    let btnGalleryRef = favoriteBtn;
    const idFavorite = favoriteBtn.dataset.id;
    if (favoriteBtn.dataset.favorite === "cocktail") {
        await toggleCocktailGalleryInDb(idFavorite, btnGalleryRef)
    } else if (favoriteBtn.dataset.favorite === "ingredient") {
        await toggleIngredientGalleryInDb(idFavorite, btnGalleryRef);
    }

}
//********************************* */


//! маніпуляція з коктейлями модалки 
export function addModalCocktailClick() {
    refs.backdropCocktail.addEventListener("click", onBtnFavCocktailModalClick);
}

export function delModalCocktailClick() {
    refs.backdropCocktail.removeEventListener("click", onBtnFavCocktailModalClick);
}

async function onBtnFavCocktailModalClick(e) {
    const auth = JSON.parse(localStorage.getItem("user") || null);

    e.preventDefault();


    if (!auth) {
        return;
    }

    const favoriteBtn = e.target.classList.contains('modal__btn')

    if (!favoriteBtn) {
        return;
    }

    let btnModalRef = e.target;
    const cocktailId = btnModalRef.dataset.id;

    const text = btnModalRef.classList.contains("is-checked") ? "Add to favorite" : "Remove from favorite";
    e.target.textContent = text;
    await toggleCocktailModalInDb(cocktailId, btnModalRef)

}
//********************************* */

//! маніпуляція з інгредієнтами модалки
export function addModalIngredientClick() {
    refs.backdropCocktail.addEventListener("click", onBtnFavIngredientModalClick);
}

export function delModalIngredientClick() {
    refs.backdropCocktail.removeEventListener("click", onBtnFavIngredientModalClick);
}

function onBtnFavIngredientModalClick(e) {
    const auth = JSON.parse(localStorage.getItem("user") || null);

    e.preventDefault();


    if (!auth) {
        return;
    }

    const favoriteBtn = e.target.classList.contains('modal__btn')

    if (!favoriteBtn) {
        return;
    }

    let btnModalRef = e.target;
    const ingredientId = btnModalRef.dataset.id;

    const text = btnModalRef.classList.contains("is-checked") ? "Add to favorite" : "Remove from favorite";
    e.target.textContent = text;
    toggleIngredientModalInDb(ingredientId, btnModalRef)
}
//********************************* */




//!Промісифікація функції авторизації.

const userPromise = new Promise((res, reg) => {
    onAuthStateChanged(auth, user => {
        if (user) {
            res(userManager.fetchUserById(user.uid));
        } else {

        }
    });
})

//! *****************************************************************************************************************
// //відмалювати улюблені в галереї


export function refreshFavCocktailOnPage() {
    const btnListCocktail = document.querySelectorAll('.gallery__list-item .js-btn-fav');
    console.log(btnListCocktail.length);
    userPromise.then((user) => {
        btnListCocktail.forEach(element => {
            favId = element.dataset.id;
            const favorite = element.dataset.favorite;
            if (user.hasFavoriteCocktailById(favId)) {
                btnToggleFavGallery(element, true)
                element.children[0].textContent = "Remove";
            } else {
                btnToggleFavGallery(element, false)
                element.children[0].textContent = "Add to";
            }
        })
    }
    ).catch(error => {
        throw new Error(error.message)
    })
}

// function displayFavIngredientOnPage(gallery = false) {
//     userPromise.then((user) => {
//         btnListIngredients.forEach(element => {
//             favId = element.dataset.id;
//             const favorite = element.dataset.favorite;
//             if (user.hasFavoriteIngredientById(favId)) {
//                 if (!gallery) {
//                     btnToggleFavGallery(element, true)
//                 } else if (gallery) {
//                     btnToggleFavIngredientModal(element, true)
//                 }
//                 console.log("Вкажи параметр функції відображення");
//             }

//         })
//     }
//     )
// }
// // Якщо у функцію нічого не передаємо - то відмалює зі стилями галереї
// // Якщо вказати true то відмалює зі стилями модального вікна


//! *****************************************************************************************************************
// ************коктейлі****************************************************
// toggle коктейль в Галереї бази даних

function setFavoritesCocktailsToLS(obj) {
    localStorage.setItem("favoriteCocktail", JSON.stringify(obj));
}

function setFavoritesIngredientsToLS(obj) {
    localStorage.setItem("favoriteIngredient", JSON.stringify(obj));
}

function toggleCocktailGalleryInDb(cocktailId, btnGalleryRef) {
    let arr;
    userPromise.then((user) => {
        if (!user.hasFavoriteCocktailById(cocktailId)) {
            addCocktailByUser(user, cocktailId);
            btnToggleFavGallery(btnGalleryRef, true);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        } else {
            deleteCocktailByUser(user, cocktailId)
            btnToggleFavGallery(btnGalleryRef, false);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        }

        if (!user.getId()) {
            alert("авторизуйтесь");
        } else {
            userManager.pushUser(user);
        }
    })
}

// toggle коктейль в Модальному вікні бази даних
export function toggleCocktailModalInDb(cocktailId, btnGalleryRef) {
    userPromise.then((user) => {
        if (!user.hasFavoriteCocktailById(cocktailId)) {
            addCocktailByUser(user, cocktailId)
            btnToggleFavCocktailModal(btnGalleryRef, true);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        } else {
            deleteCocktailByUser(user, cocktailId)
            btnToggleFavCocktailModal(btnGalleryRef, false);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        }
        refreshFavCocktailOnPage();
        if (!user.getId()) {
            alert("авторизуйтесь");
        } else {
            userManager.pushUser(user);
        }
    })
}

function addCocktailByUser(user, cocktailId) {
    if (!user.hasFavoriteCocktailById(cocktailId)) {
        user.addFavoriteCocktailById(cocktailId);
    }
}

function deleteCocktailByUser(user, cocktailId) {
    if (user.hasFavoriteCocktailById(cocktailId)) {
        user.deleteFavoriteCocktailById(cocktailId);
    }
}

// ************iнгредієнти****************************************************

// toggle інгредієнтів в Галереї бази даних
function toggleIngredientGalleryInDb(ingredientId, btnGalleryRef) {
    userPromise.then((user) => {
        if (!user.hasFavoriteIngredientById(ingredientId)) {
            addIngredientByUser(user, ingredientId)
            btnToggleFavGallery(btnGalleryRef, true);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        } else {
            delIngredientByUser(user, ingredientId)
            btnToggleFavGallery(btnGalleryRef, false);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        }
        if (!user.getId()) {
            alert("авторизуйтесь");
        } else {
            userManager.pushUser(user);
        }
    })
}

// toggle коктейль в Модальному вікні бази даних
function toggleIngredientModalInDb(ingredientId, btnGalleryRef) {
    userPromise.then((user) => {
        if (!user.hasFavoriteIngredientById(ingredientId)) {
            addIngredientByUser(user, ingredientId)
            btnToggleFavIngredientModal(btnGalleryRef, true);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        } else {
            delIngredientByUser(user, ingredientId)
            btnToggleFavIngredientModal(btnGalleryRef, false);
            // TODO Дописати нотіфікашку
            console.log("Дописати нотіфікашку");
        }
        if (!user.getId()) {
            alert("авторизуйтесь");
        } else {
            userManager.pushUser(user);
        }
    })
}

function addIngredientByUser(user, ingredientId) {
    if (!user.hasFavoriteIngredientById(ingredientId)) {
        user.addFavoriteIngredientById(ingredientId);
    }
}

function delIngredientByUser(user, ingredientId) {
    if (user.hasFavoriteIngredientById(ingredientId)) {
        user.deleteFavoritesIngredientById(ingredientId);
    }
}


//! ***********************************************************************************************************************
// TODO зміна стилів в галереї по кліку додати до улюблених
// !!!   рядок btn.classList.add("is-checked"); - не змінювати

function btnToggleFavGallery(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("is-checked");
        // btn.children[0].textContent = "Remove";
    } else {
        btn.classList.remove("is-checked");
        // btn.children[0].textContent = "Add to";
    }
}

// TODO зміна стилів по кліку в модальному вікні додати до улюблених
// !!!   рядок btn.classList.add("is-checked"); - не змінювати
function btnToggleFavCocktailModal(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("is-checked");
        btn.classList.textContent = "Remove from favorite"
    } else {
        btn.classList.remove("is-checked");
        btn.classList.textContent = "Add to favorite"
    }
}

function btnToggleFavIngredientModal(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("is-checked");
        btn.classList.textContent = "Remove from favorite"
    } else {
        btn.classList.remove("is-checked");
        btn.classList.textContent = "Add to favorite"
    }
}
//! ***********************************************************************************************************************


