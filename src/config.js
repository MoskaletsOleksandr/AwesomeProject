import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDL1yTgxFFV2PmZLv8Ozq5bClrWFaB4haE',
  authDomain: 'awesomeproject-4d4d3.firebaseapp.com',
  databaseURL:
    'https://awesomeproject-4d4d3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'awesomeproject-4d4d3',
  storageBucket: 'awesomeproject-4d4d3.appspot.com',
  messagingSenderId: '437034169054',
  appId: '1:437034169054:web:7502b326ee3f81c0cb884f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
