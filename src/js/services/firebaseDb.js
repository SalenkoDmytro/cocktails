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

// const user = managerUser.fetchUserById("123456")

// const btnClick = document.querySelector('.gallery__list');
// btnClick.addEventListener("click", onBtnClick);



userPromise.then((user) => {
    // if (!user.isFetched()) {
    //     managerUser.pushUser(user); Пушиться тоді коли в нього щось є.
    // }
    const list = document.querySelectorAll('.gallery__btn-fav');
    for (let i in list) {
        let btn = list[i];

        if (btn.nodeName !== "BUTTON") {
            continue;
        }

        let drinkId = btn.hasAttribute("data-id") ? btn.dataset.id : false;
        if (drinkId && user.hasFavoriteCocktailById(drinkId)) {
            btnToggle(btn, true)
        }
        btn.addEventListener("click", onBtnClick);
    }
})


function onBtnClick(e) {
    const btn = e.target;
    const drinkId = e.target.dataset.id;
    userPromise.then((user) => {
        if (!user.hasFavoriteCocktailById(drinkId)) {
            user.addFavoriteCocktailById(drinkId);
            btnToggle(btn, true);
            console.log("added>>", user.favoritesCocktails);
        } else {
            console.log("del before>>", user.favoritesCocktails);
            user.deleteFavoriteCocktailById(drinkId);
            console.log("del after>>", user.favoritesCocktails);
            btnToggle(btn, false);
        }
        if (!user.getId()) {
            alert("авторизуйтесь");
        } else {
            userManager.pushUser(user);
        }
    })
}




function btnToggle(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("is-checked");
        btn.style.backgroundColor = "red";

    } else {
        btn.classList.remove("is-checked");
        btn.style.backgroundColor = "inherit";
    }
}



















// function onBtnClick(e) {
//     if (e.target.nodeName !== "BUTTON") return;
//     console.log("object");
//     const drinkId = e.target.dataset.id;
//     userPromise.then((user) => {
//         if (!user.hasFavoriteCocktailById(drinkId)) {
//             user.addFavoriteCocktailById(drinkId);
//             managerUser.pushUser(user);
//         }
//     })
// }


























// drinkingUser.addFavoriteCocktailById("123");
//drinkingUser.push();


// drinkingUser.writeUserData();
// drinkingUser.pushCocktailToDbByUserId("123");
// drinkingUser.pushCocktailToDbByUserId("321");




// const favouriteBtn = document.querySelector(".gallery__btn-fav");
// favouriteBtn.addEventListener('click', onFavouriteBtnClick)

// export function onFavouriteBtnClick() {
//     console.log("🚀 ~ onFavouriteBtnClick ~ user", user)
//     // const drinkingUserManager = new DrinkingUserManager(db);
//     // const drinkingUserFactory = new DrinkingUserFactoryManager();
//     // const drinkingUserManager = drinkingUserFactory.getManager("FIREBASE", { db });
//     //у класів фабрики назва методів має співпадати по назві і повертати одне і теж
//     // const currentUser = fetchUserById(user.uid);
//     // const data = await drinkingUserFactory.getDataFromFirebase(currentUser)


//     // drinkingUserManager.fetchUserById(user.uid).then((user) => {

//     const idCocktail = "12345"

//     drinkingUserManager.pushCocktailToDbByUserId(idCocktail, user)


//     // if (!currentUser.isExistInDb()) {
//     //     drinkingUserManager.pushUserById(currentUser);
//     // }
// }


//******************************************************************************* */

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

