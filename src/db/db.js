import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../configs/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
