import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { firebaseConfig } from '../config/firebaseConfig';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
} from 'firebase/auth'

import DrinkingUser from "./createUser";
import UserManager from "./managerUser";


export default class Page {
    constructor() {
        //поточний користувач
        this.user = new DrinkingUser(false);
        //аворизований користувач
        this.authUser = false;
        //firebase
        this.app = false;
        this.db = false;
        this.signAuth = false;
        this.signApp = false;
        this.signProvider = false;
    }

    /** 
     * ініціалізація підключення до DB firebase
     * */
    initDb() {
        if (!this.db) {
            this.app = initializeApp(firebaseConfig);
            this.db = getDatabase();
        }
    }

    /**
     * основна функція
     * */
    init() {
        this.signApp = initializeApp(firebaseConfig);
        this.signAuth = getAuth();
        this.signProvider = new GoogleAuthProvider();

        onAuthStateChanged(auth, user => {
            if (user) {
                // LogIn
            } else {
                //LogOut
            }
        });

        this.render();
        this.refresh();
    }

    /**
     *   отримати дані користувача з бази даних
    * */
    fetchUserData(id) {
        this.initDb();
        const userManager = new UserManager(this.db);
        const userPromise = userManager.fetchUserById(id);
        userPromise.then((user) => {
            this.user.importCocktails(user.getFavoritesCocktails());
            this.refresh();
        })
    }

    /**
      *   авторизація користувача
     * */
    signInUser() {
        return signInWithPopup(this.signAuth, this.signProvider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                this.authUser = result.user;
                this.fetchUserData(this.authUser.uid)
            })
            .catch(error => {
            });
    }

    /**
    *   деавторизація користувача
    * */
    signOutInUser() {
        signOut(auth)
            .then(() => {
                console.log("Sign-out successful");
                // Sign-out successful.
                //TODO очистити користувача  обнулити масиви улюблених
                this.refresh();
            })
            .catch(error => {
                // An error happened.
            });
    }

    /**
      *   відмальовування сторінки
     * */
    render() {
        let self = this;

        const modalBtnSignIn = document.querySelector('[data-modal-sign-in-open]');
        modalBtnSignIn.addEventListener("click", function (e) {
            let sign = e.target.dataset.sign;
            if (sign === "sign-out") {
                self.signInUser();
            } else {
                self.signOutInUser();
            }
        });

        const btnListCocktail = document.querySelectorAll('[data-favorite=cocktail]');
        btnListCocktail.forEach((element) => {
            element.addEventListener("click", function () {
                self.onBtnFavClick(element);
            })
        })
    }

    onBtnFavClick(btn) {
        let favId = btn.dataset.id;
        if (this.user.hasFavoriteCocktailById(favId)) {
            this.btnToggleFavGallery(btn, true)
        }
    }

    /**
      *   Зміна кольору кнопки
     * */
    btnToggleFavGallery(btn, isChecked) {
        if (isChecked) {
            btn.classList.add("is-checked");
        } else {
            btn.classList.remove("is-checked");
        }
    }

    /**
    *   Оновлення кнопки
    * */
    refreshBtns() {
        const btnListCocktail = document.querySelectorAll('[data-favorite=cocktail]');
        btnListCocktail.forEach(element => {
            let favId = element.dataset.id;
            if (this.user.hasFavoriteCocktailById(favId)) {
                this.btnToggleFavGallery(element, true)
            }
        })
    }


    /**
    *   Оновлення сторінки
    * */
    refresh() {
        this.refreshBtns();
    }


}



