import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  getDoc,
  setDoc,
  doc, collection, writeBatch
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyYcstU4WzxcR8fjBgbodiznHBa0B91BU",
  authDomain: "crwn-clothing-db-53c18.firebaseapp.com",
  projectId: "crwn-clothing-db-53c18",
  storageBucket: "crwn-clothing-db-53c18.appspot.com",
  messagingSenderId: "784626763456",
  appId: "1:784626763456:web:7210891d16a1bd2c940f25"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account"
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  })
  await batch.commit();
  console.log('done');

}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid ? userAuth.uid : userAuth.user.uid)


  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth.user ? userAuth.user : userAuth;
    const createdAt = new Date();
    try {
      await setDoc(
        userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      }
      );
    } catch (error) {
      console.log('error', error.message)

    }

  }
  return userDocRef;


}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)

}
export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callBack) => {
  onAuthStateChanged(auth, callBack)
}