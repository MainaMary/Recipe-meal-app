import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBuzFR1gZCt4SeVqprsCDcrNphLoqjj8BQ",
  authDomain: "fir-react-authentication-6bb82.firebaseapp.com",
  projectId: "fir-react-authentication-6bb82",
  storageBucket: "fir-react-authentication-6bb82.appspot.com",
  messagingSenderId: "660448906967",
  appId: "1:660448906967:web:f7306261c85c4445caaa92",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
