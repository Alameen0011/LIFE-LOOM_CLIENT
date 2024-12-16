// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:'AIzaSyCjzDOSIQ8eRW7pXewNoT11cjMFFKMHWv4',
  authDomain: "life-206db.firebaseapp.com",
  projectId: "life-206db",
  storageBucket: "life-206db.appspot.com",
  messagingSenderId: "765523807741",
  appId: "1:765523807741:web:9c4fbb8a482ad0fdd99d94",
  measurementId: "G-7NRJ2FJXTB"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider};