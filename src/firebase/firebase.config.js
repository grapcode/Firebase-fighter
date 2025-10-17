// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAszF4gBg4FtKO9v0cQxyDuUinh07P15PU',
  authDomain: 'fir-fighter-8ab52.firebaseapp.com',
  projectId: 'fir-fighter-8ab52',
  storageBucket: 'fir-fighter-8ab52.firebasestorage.app',
  messagingSenderId: '784054034907',
  appId: '1:784054034907:web:d4afc8233677da4a81c7fe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
