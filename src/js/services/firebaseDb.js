import { initializeApp } from 'firebase/app';
// // import { getDatabase, getDatabase, ref, update, get } from "firebase/database";

import { getDatabase, ref, set, get, remove } from "firebase/database";

import { firebaseConfig } from '../config/firebaseConfig';

import './UserManager';


initializeApp(firebaseConfig);

import { getUser } from "../services/firebaseAuthorization";

const db = getDatabase();

import DrinkingUserFactoryManager from '../services/DrinkingUserFactoryManager';


const favouriteBtn = document.querySelector(".gallery__btn-fav");
favouriteBtn.addEventListener('click', onFavouriteBtnClick)


export async function onFavouriteBtnClick() {
    const user = getUser();
    // const drinkingUserManager = new DrinkingUserManager(db);
    const drinkingUserFactory = new DrinkingUserFactoryManager();
    const drinkingUserManager = drinkingUserFactory.getManager("FIREBASE", { db });
    //у класів фабрики назва методів має співпадати по назві і повертати одне і теж

    // const currentUser = fetchUserById(user.uid);
    // const data = await drinkingUserFactory.getDataFromFirebase(currentUser)

    drinkingUserManager.fetchUserById(user.uid).then((user) => {

        const idCocktail = "12345"
        // drinkingUserManager.deleteCocktailDbByUserId(idCocktail, user)
        drinkingUserManager.pushCocktailToDbByUserId(idCocktail, user)
    });

    // if (!currentUser.isExistInDb()) {
    //     drinkingUserManager.pushUserById(currentUser);
    // }
}



// user = {
//     userId: "id",
//     userName: "name",
//     coctaile: { 0: 0, 1: 1, 2: 2 },
//     ingredients: { 0: 0, 1: 1, 2: 2 }
// }


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