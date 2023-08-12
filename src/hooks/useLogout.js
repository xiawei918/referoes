import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setisPending] = useState(null);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setisPending(true);

        // sign the user out
        try {
            await signOut(auth);
            dispatch({ type: 'LOGOUT' });
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

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error, isPending };
}