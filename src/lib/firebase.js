/** @format */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCU7Jkmb4qYZOnK5ca-EaA8r-hQ1rBQ48U',
  authDomain: 'clone-cd22a.firebaseapp.com',
  projectId: 'clone-cd22a',
  storageBucket: 'clone-cd22a.appspot.com',
  messagingSenderId: '62563196143',
  appId: '1:62563196143:web:8ffd6ad4475121a271cf1a',
};

const app = initializeApp(firebaseConfig);
// initializing app //
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
// initalize firestore , analytics, auth, storage, //
console.log(auth);
export {
  firestore, analytics, auth, storage,
};
