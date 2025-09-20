// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "cheesyorder.firebaseapp.com",
  databaseURL: "https://cheesyorder-default-rtdb.firebaseio.com",
  projectId: "cheesyorder",
  storageBucket: "cheesyorder.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, set, push, onValue, update };