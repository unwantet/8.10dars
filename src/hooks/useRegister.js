import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function useRegister() {
    const [isPending , setIsPending] = useState(false)
    const dispatch = useDispatch();

    const signWithGoogle = async() => {
        try{
            const provider = new GoogleAuthProvider();   
            setIsPending(true)
           const result = await signInWithPopup(auth, provider)
            GoogleAuthProvider.credentialFromResult(result)
            const user = result.user
            dispatch(login(user))
            setIsPending(false)
        }catch(err){
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }
    return {signWithGoogle , isPending}
}

export {useRegister}