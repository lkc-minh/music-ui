import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ3dR48MINJdaho0e9mb0IulkKs8sr6OE",
  authDomain: "nhaccuatui-fake.firebaseapp.com",
  projectId: "nhaccuatui-fake",
  storageBucket: "nhaccuatui-fake.appspot.com",
  messagingSenderId: "625952731686",
  appId: "1:625952731686:web:1169ac25b83fe440a4ece7",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
