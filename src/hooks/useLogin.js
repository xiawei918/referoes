import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword, GoogleAuthProvider,
     getAuth, signInWithRedirect, GithubAuthProvider,
     FacebookAuthProvider } from "firebase/auth";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setisPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setisPending(true);

        // sign the user out
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            dispatch({ type: 'LOGIN', payload: response.user });
            console.log('cancelled?', isCancelled)
            if (!isCancelled) {
                setisPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setisPending(false);
            }
        }
    }

    const loginWithGoogle = async() => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            await loginWithProvider(auth, provider);
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginWithFacebook = async() => {
        try {
            const auth = getAuth();
            const provider = new FacebookAuthProvider();
            await loginWithProvider(auth, provider);
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginWithGithub = async() => {
        try {
            const auth = getAuth();
            const provider = new GithubAuthProvider();
            await loginWithProvider(auth, provider);
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginWithProvider = async (auth, provider) => {
        signInWithRedirect(auth, provider);
    }

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, []);

    return { login, loginWithGoogle, loginWithFacebook, loginWithGithub, error, isPending };
}