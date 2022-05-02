import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3SVSFixcU7MnIJpPd5s5kN0BAs_yZukk",
    authDomain: "house-marketplace-app-cc541.firebaseapp.com",
    projectId: "house-marketplace-app-cc541",
    storageBucket: "house-marketplace-app-cc541.appspot.com",
    messagingSenderId: "926641480568",
    appId: "1:926641480568:web:b58a474501ca13bfd49e8d",
    databaseURL: 'https://house-marketplace-app-cc541.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();