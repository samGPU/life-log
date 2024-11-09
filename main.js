import './style.css'
import './customStyles.css'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6HZNHBpoqoDkseuaNjdK1gLZnDQW-6Y0",
  authDomain: "food-log-65827.firebaseapp.com",
  projectId: "food-log-65827",
  storageBucket: "food-log-65827.firebasestorage.app",
  messagingSenderId: "536300635957",
  appId: "1:536300635957:web:37721f81c1de4077606e7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log('Firebase is ready');
  const newFoodLog = document.querySelector('#new-food-log');
  newFoodLog.addEventListener('submit', submitNewFoodLog);
});

async function submitNewFoodLog(event) {
  console.log('submitNewFoodLog');
  event.preventDefault();

  const form = event.target;
  const data = {
    food: form.foodName.value,
    UPF: form.UPF.checked,
    excess: form.excess.checked,
    snack: form.snack.checked,
    date: Timestamp.fromDate(form.date.valueAsDate),
  }

  try {
    const docRef = await addDoc(collection(db, "food-logs"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  form.reset();
}
