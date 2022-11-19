// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuzFR1gZCt4SeVqprsCDcrNphLoqjj8BQ",
  authDomain: "fir-react-authentication-6bb82.firebaseapp.com",
  projectId: "fir-react-authentication-6bb82",
  storageBucket: "fir-react-authentication-6bb82.appspot.com",
  messagingSenderId: "660448906967",
  appId: "1:660448906967:web:f7306261c85c4445caaa92",
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
//   authDomain:import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_FIREBASE_API_KEY_MESSAGE_SENDER_ID,
//   appId:import.meta.env.VITE_APP_ID,
// };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//initialize firebase authentication
export const auth = getAuth(app);
export default app;
