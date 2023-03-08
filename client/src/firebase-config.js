import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPf-SbN2XO2-OFpu5F7nq3zQlL72HFgZc",
    authDomain: "hilltalk-5a1ef.firebaseapp.com",
    projectId: "hilltalk-5a1ef",
    storageBucket: "hilltalk-5a1ef.appspot.com",
    messagingSenderId: "169163974623",
    appId: "1:169163974623:web:74c907421d8748f1ebc66a",
    measurementId: "G-9S07LWCQXY"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);