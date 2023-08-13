import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { updateProfile, updateEmail } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useUpdateProfile = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setisPending] = useState(null);
    const { dispatch } = useAuthContext();

    const updateUserProfile = async (updatedProfile) => {
        setError(null);
        setisPending(true);

        try {
            await updateProfile(auth.currentUser, updatedProfile);
            await updateEmail(auth.currentUser, updatedProfile.email);
            dispatch({ type: 'UPDATE_PROFILE', payload: auth.currentUser });
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

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, []);

    return { error, isPending, updateUserProfile };
}