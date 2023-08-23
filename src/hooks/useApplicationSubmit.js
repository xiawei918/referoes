import { useEffect, useState } from "react";
import { useFirestore } from "./useFirestore"; 

export const useSubmitApplication = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { addDocument, response } = useFirestore('applications');

    const submitApplication = async (application) => {
        setError(null);
        setIsPending(true);
        console.log(application)
        // sign the user in
        try {
            await addDocument(application);

            // dispatch logout action
            // update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { submitApplication, error, isPending, response };

}