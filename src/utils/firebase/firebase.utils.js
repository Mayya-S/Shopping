import {initializeApp  } from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider  } from 'firebase/auth'
import {
getFirestore,
getDoc,
setDoc,
doc
}from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDyYcstU4WzxcR8fjBgbodiznHBa0B91BU",
    authDomain: "crwn-clothing-db-53c18.firebaseapp.com",
    projectId: "crwn-clothing-db-53c18",
    storageBucket: "crwn-clothing-db-53c18.appspot.com",
    messagingSenderId: "784626763456",
    appId: "1:784626763456:web:7210891d16a1bd2c940f25"
  };

  const firebaseApp = initializeApp(firebaseConfig);
   const provider =new  GoogleAuthProvider()
   provider.setCustomParameters({
    prompt:"select_account"
   })
   export const auth=getAuth()
   export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)
   export const db=getFirestore()

   export const createUserDocumentFromAuth=async(userAuth)=>{
     
     const userDocRef=doc(db,'users',userAuth.user.uid)
     

     const userSnapshot=await getDoc(userDocRef);
     
     if(!userSnapshot.exists()){
       const {displayName,email}=userAuth.user;
       const createdAt=new Date();
       try{
         await setDoc(
           userDocRef,{
             displayName,
             email,
             createdAt
           }
         );         
       }catch(error){
         console.log('error',error.message)
           
         }

     }
     return userDocRef;


   }