import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyBJqxxO7zqExpluNTtMiGWuoWoBCy8uC6Y",
  authDomain: "cljs92-n1.firebaseapp.com",
  projectId: "cljs92-n1",
  storageBucket: "cljs92-n1.appspot.com",
  messagingSenderId: "648432244731",
  appId: "1:648432244731:web:0ca492ed603d53cbb8dd5e"
  };
 


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseContext = createContext();

// const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// auth.languageCode = "it";


const FirebaseProvider = ({ children }) => {
  const db = getFirestore(app);
  const messCollect = collection(db, "product"); // Specify the collection path here
  const messItem = collection(db, "productItem"); // Specify the collection path here
  const messCustomer=collection(db,"customer");
  return (
    <FirebaseContext.Provider value={{ app, messCollect, messItem , messCustomer, provider}}>
      {children}
    </FirebaseContext.Provider>
  );
};




export default FirebaseProvider;