import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { firebaseConfig } from '../config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase();

import UserManager from '../drinkingUser/managerUser'

// import { getUser } from "../services/firebaseAuthorization";
// const user = getUser();

const userManager = new UserManager(db);
const userPromise = userManager.fetchUserById("1234")

//Прописати атрибути на галерею коктейлів і інгредієнтів
const listFavCocktailGallery = document.querySelector('[data-gallery-cocktail]');
const listFavIngredientGallery = document.querySelector('[data-gallery-ingredient]');

//Прописати атрибути на кнопки коктейлів і інгредієнтів
const btnListCocktail = document.querySelectorAll('[data-favorite=cocktail]');
const btnListIngredients = document.querySelectorAll('[data-favorite=ingredient]');

listFavCocktailGallery.addEventListener("click", onBtnFavCocktailGalleryClick);
listFavIngredientGallery.addEventListener("click", onBtnFavIngredientGalleryClick);


//! *****************************************************************************************************************
//клік по кнопці додати до улюблених коктейлів
async function onBtnFavCocktailGalleryClick(e) {
    e.preventDefault();
    const favoriteBtn = e.target.hasAttribute("data-favorite")
    if (!favoriteBtn) {
        return;
    }
    btnGalleryRef = e.target;
    const idFavorite = e.target.dataset.id;
    await toggleCocktailModalInDb(idFavorite, btnGalleryRef)
}

//клік по кнопці додати до улюблених інгредієнтів
async function onBtnFavIngredientGalleryClick(e) {
    e.preventDefault();
    const favoriteBtn = e.target.hasAttribute("data-favorite")
    if (!favoriteBtn) {
        return;
    }
    btnGalleryRef = e.target;
    const idFavorite = e.target.dataset.id;
    await toggleIngredientGalleryInDb(idFavorite, btnGalleryRef, true)
}

//! *****************************************************************************************************************
//відмалювати улюблені в галереї
function displayFavCocktailOnPage(gallery = false) {
    userPromise.then((user) => {
        btnListCocktail.forEach(element => {
            favId = element.dataset.id;
            const favorite = element.dataset.favorite;
            if (user.hasFavoriteCocktailById(favId)) {
                if (!gallery) {
                    btnToggleFavGallery(element, true)
                } else if (gallery) {
                    btnToggleFavCocktailModal(element, true)
                }
                console.log("Вкажи параметр відмалювання");
            }
        })
    }
    )
}

function displayFavIngredientOnPage(gallery = false) {
    userPromise.then((user) => {
        btnListIngredients.forEach(element => {
            favId = element.dataset.id;
            const favorite = element.dataset.favorite;
            if (user.hasFavoriteIngredientById(favId)) {
                if (!gallery) {
                    btnToggleFavGallery(element, true)
                } else if (gallery) {
                    btnToggleFavIngredientModal(element, true)
                }
                console.log("Вкажи параметр функції відображення");
            }

        })
    }
    )
}
// Якщо у функцію нічого не передаємо - то відмалює зі стилями галереї
// Якщо вказати true то відмалює зі стилями модального вікна
displayFavCocktailOnPage();
displayFavIngredientOnPage(true);


//! *****************************************************************************************************************
// ************коктейлі**************************************************** 
// toggle коктейль в Галереї бази даних
function toggleCocktailGalleryInDb(cocktailId, btnGalleryRef) {
    userPromise.then((user) => {
        if (!user.hasFavoriteCocktailById(cocktailId)) {
            addCocktailByUser(user, cocktailId)
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
function toggleCocktailModalInDb(cocktailId, btnGalleryRef) {
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
        btn.style.backgroundColor = "red";

    } else {
        btn.classList.remove("is-checked");
        btn.style.backgroundColor = "inherit";
    }
}


// TODO зміна стилів по кліку в модальному вікні додати до улюблених
// !!!   рядок btn.classList.add("is-checked"); - не змінювати
function btnToggleFavCocktailModal(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("is-checked");
        btn.style.backgroundColor = "yellow";

    } else {
        btn.classList.remove("is-checked");
        btn.style.backgroundColor = "inherit";
    }
}

function btnToggleFavIngredientModal(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("is-checked");
        btn.style.backgroundColor = "green";

    } else {
        btn.classList.remove("is-checked");
        btn.style.backgroundColor = "inherit";
    }
}
//! ***********************************************************************************************************************
























/*
export function addTaskToDb(objForDb) {
    try {
        set(ref(db, "task/" + objForDb.date), objForDb);
    } catch (error) {
        console.log(error);
    }
}


export function getTaskFromDb(key = "") {
    let url = "task/";
    if (key) {
        url += key;
    }

    return get(ref(db, url))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                console.log(snapshot);
                return null;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}


export function updateTaskDB(idTask, isChecked) {
    getTaskFromDb(idTask)
        .then((data) => {
            data.checked = isChecked;
            return data;
        })
        .then((data) => addTaskToDb(data))
        .catch((error) => console.log(error));
}



export function deleteTask(id) {
    console.log(id);
    try {
        remove(ref(db, "task/" + id));
    } catch (error) {
        console.log(error);
    }
}
 */

