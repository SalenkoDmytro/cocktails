// import { getDatabase, ref, push, onValue } from "firebase/database";
// import { getUser } from "./firebase-authorization";


// let arrayIdMessage = [];

// export function addMessage(data) {
//     try {
//         push(ref(db, 'chat/'), data);
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

// onValue(ref(db, 'chat/'), (snapshot) => {
//     const data = snapshot.val();
//     if (!data) return;
//     const [value, array] = getArrayId(data, arrayIdMessage);
//     arrayIdMessage = array;
//     const userId = getUser().uid;
//     const markup = messageMarkup(value, userId)
//     renderMarkup(markup, chatBoxes)
// });