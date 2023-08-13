import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

export const useForgotPassword = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const resetPasswordViaEmail = async (email) => {
        setError(null);
        setIsPending(true);

        // send the reset password email
        try {
            await sendPasswordResetEmail(auth, email);

            // update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { resetPasswordViaEmail, error, isPending };

}