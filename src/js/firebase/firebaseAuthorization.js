import { initializeApp } from 'firebase/app';
// import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, get, push, onValue } from "firebase/database";

import { firebaseConfig } from '../config/firebaseConfig';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  addListenerAfterLogIn,
  delListenerAfterLogOut,
  addListenerAuthLogOut,
  delListenerAuthLogOut,
  delBtnFavoriteClassChecked,
  LogIn,
  LogOut
} from "./firebaseDb";

// TODO Change - Add listener when modal open
const modalBtnSignIn = document.querySelector('[data-modal-sign-in-open]');
modalBtnSignIn.addEventListener("click", onLoginClick);

function onLoginClick(evt) {
  let sign = evt.target.dataset.sign;
  if (sign === "sign-out") {
    userSignInWithGoogle();
  } else {
    userSignOut();
  }
}

function userSignInWithGoogle() {
  return signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;


      console.log("🚀 ~ userSignInWithGoogle ~ user.uid", user.uid)
      // ...
      //TODO close modal autorization  closeModalAuth();
      //TODO get data from user acount   getDataFromFirebase(user.uid);
      //TODO markup cocktaile renderFavouriteCocktaileByUser(user.uid);
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    // // LogIn(modalBtnSignIn);
    modalBtnSignIn.dataset.sign = "sign-in";
    modalBtnSignIn.textContent = "Log out";
    addListenerAfterLogIn();
    delListenerAuthLogOut();
    console.log(user);
  } else {
    // // LogOut(modalBtnSignIn);
    delBtnFavoriteClassChecked();
    delListenerAfterLogOut();
    addListenerAuthLogOut();
    modalBtnSignIn.dataset.sign = "sign-out"
    modalBtnSignIn.textContent = "Log in";
  }


  // TODO toggleBtnContent(user);
});


export function userSignOut() {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");

      // Sign-out successful.
      //TODO notify about SEE YOU LATER;
    })
    .catch(error => {
      // An error happened.
      //TODO notify Something went wrong. Please try again;
    });
}








