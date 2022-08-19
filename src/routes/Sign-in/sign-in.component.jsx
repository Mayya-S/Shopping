import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn=()=>{
    useEffect(() => {
        async function fetchMyAPI() {
            const response =await getRedirectResult(auth);
            if(response){
                const userDocRef=await createUserDocumentFromAuth(response)    
            }
        }    
        fetchMyAPI()
      }, [])

        const logGoogleUser=async()=>
        {
            const {user}=await signInWithGooglePopup()
            const userDocRef=await createUserDocumentFromAuth(user)

        }
    
    return (
        <div>
            <button onClick={logGoogleUser}>Sign in With Googlee with Popup</button><br/>
            <button onClick={signInWithGoogleRedirect}>Sign in With Google with Redirect</button>
            <SignUpForm/>

            <h1>
                Sign In
            </h1>
        </div>
    )
}
export default SignIn