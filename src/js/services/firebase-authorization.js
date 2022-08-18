import { initializeApp } from "firebase/app";
// import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { getDatabase, ref, push, onValue } from "firebase/database";

import { firebaseConfig } from "../config/firebase-config";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
// const storage = getStorage();
// const db = getDatabase();


// TODO Change - Add listener when modal open
// refs.buttonLoginWithMailPassword.addEventListener("click", onLoginClick);
// refs.buttonLoginWithGoogle.addEventListener("click", onLoginClick);
// refs.buttonLogin.addEventListener("click", onLoginClick);

// import { refs } from '../config/refs';
// const { buttonLogin } = refs;

// function onLoginClick(evt) {
//     let id = evt.target.dataset.id;

//     console.log(id);
//     // if (id === "Sign in") {
//     //     userSignIn();
//     // } else {
//     //     userSignOut();
//     // }
// }


function userRegistration(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // TODO Signed in
            const user = userCredential.user;
        })
        .catch(error => {
            // notify Something went wrong. Please try again
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

function userSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // TODO Signed in
            const user = userCredential.user;

            // TODO notify success 'You are successfully authorized';
            // TODO close modal autorization  closeModalAuth();

            // TODO get data from user acount   getDataFromFirebase(user.uid);
            // TODO markup cocktaile renderFavouriteCocktaileByUser(user.uid);
        })
        .catch(error => {
            const errorMessage = error.message;
            // TODO notify success Wrong email or password. Please try again or register.;
            // TODO reset form registration
            return errorMessage;
        });
}


function userSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // ...
            //TODO close modal autorization  closeModalAuth();
            //TODO get data from user acount   getDataFromFirebase(user.uid);
            //TODO markup cocktaile renderFavouriteCocktaileByUser(user.uid);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

onAuthStateChanged(auth, (user) => {
    // refs.buttonLogin.dataset = "Sign out"
    // TODO toggleBtnContent(user);
    //TODO  isChatVisible(user);
});

function userSignOut() {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            //TODO notify about SEE YOU LATER;
        })
        .catch((error) => {
            // An error happened.
            //TODO notify Something went wrong. Please try again;
        });
}

export function getUser() {
    return auth.currentUser;
}







