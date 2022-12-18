// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMQdBqcuzSKOcV_evzthcVK2Glv0CITVQ",
  authDomain: "web-koin.firebaseapp.com",
  projectId: "web-koin",
  storageBucket: "web-koin.appspot.com",
  messagingSenderId: "742982721654",
  appId: "1:742982721654:web:1b117633507ea122b13f57",
  measurementId: "G-BL1ZTSXMN4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);