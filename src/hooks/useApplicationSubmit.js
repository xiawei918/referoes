import { useEffect, useState } from "react";
import { useFirestore } from "./useFirestore"; 
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { projectFirestore } from "../firebase/config";

export const useSubmitApplication = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { addDocument, response } = useFirestore('applications');

    const submitApplication = async (application) => {
        setError(null);
        setIsPending(true);
        // sign the user in
        try {
            await addDocument(application);

            const companyRef = doc(projectFirestore, 'companies', application.company);
            const companySnap = await getDoc(companyRef);
            if (companySnap.exists()) {
                const companyAppCount = companySnap.data()?.applicationCount;
                updateDoc(companyRef, {...companySnap.data(), applicationCount: companyAppCount+1});
            }
            else {
                setDoc(companyRef, {applicationCount: 1, memberCount: 0});
            }

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