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

// const storage = getStorage();

// import DrinkingUserFactoryManager from '../services/DrinkingUserFactoryManager';

// const drinkingUserFactory = new DrinkingUserFactoryManager();
// const drinkingUserManager = drinkingUserFactory.getManager("FIREBASE", { db });

// drinkingUserManager.fetchUserById(user.uid).then((user) => {
//   if (!user.isExistInDb()) {
//     drinkingUserManager.pushUserById(user);
//     // drinkingUserManager.pushCoctaileToDbByUserId("11111", user)
//   }
// });

// const modalBtnSignIn = document.querySelector('.modal-button-sign-in');

// // TODO Change - Add listener when modal open
// modalBtnSignIn.addEventListener("click", onLoginClick);

// async function onLoginClick(evt) {
//   let sign = evt.target.dataset.sign;
//   if (sign === "Sign-in") {
//     userSignInWithGoogle();
//     modalBtnSignIn.dataset.sign = "Sign-out";
//     modalBtnSignIn.textContent = "Sign out";
//   } else {
//     userSignOut();
//     modalBtnSignIn.dataset.sign = "Sign-in"
//     modalBtnSignIn.textContent = "Sign in";
//   }
// }

//Після авторизації фетчимо юзера.
// authUser.uid ~ drinkingUser.Id; айдішки рівні за смислом.

//Забираю 
//Коли клікає перевіряти на ми пушимо зміни.


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
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
      drinkingUserFactory.getDataFromFirebase(user.uid)
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
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, user => {
  // TODO toggleBtnContent(user);
  //TODO  isChatVisible(user);
});

function userSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      //TODO notify about SEE YOU LATER;
    })
    .catch(error => {
      // An error happened.
      //TODO notify Something went wrong. Please try again;
    });
}


export function getUser() {
  return auth.currentUser;
}






