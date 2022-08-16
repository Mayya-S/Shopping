import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn=()=>{
    const logGoogleUser=async()=>
    {
        const {user}=await signInWithGooglePopup()
        const userDocRef=await createUserDocumentFromAuth(user)
        

    }
    return (
        <div>
            <button onClick={logGoogleUser}>Sign in With Google</button>
            <h1>
                Sign In
            </h1>
        </div>
    )
}
export default SignIn