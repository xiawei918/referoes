import { useState, useEffect } from "react";
import { auth, storage, projectFirestore } from "../firebase/config";
import { updateProfile, updateEmail } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from "firebase/firestore"


export const useUpdateProfile = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setisPending] = useState(null);
    const { dispatch } = useAuthContext();

    const updateUserProfile = async ({displayName, email, thumbnail, bio, company}) => {
        setError(null);
        setisPending(true);
        let newProfile = {};
        if (displayName !== auth.currentUser.displayName) {
            newProfile = { displayName };
        }
        // upload user thumbnail
        if (thumbnail) {
            const uploadPath = `thumbnails/${auth.currentUser.uid}/${thumbnail.name}`
            const img = await uploadBytesResumable(ref(storage, uploadPath), thumbnail);
            const imgUrl = await getDownloadURL(img.ref);
            newProfile = { ...newProfile, photoURL: imgUrl };
        }

        try {
            if (Object.keys(newProfile).length > 0) {
                await updateProfile(auth.currentUser, newProfile);
            }
            if (bio || company) {
                const userDoc = { ...newProfile, bio, company};
                await updateDoc(doc(projectFirestore, 'users', auth.currentUser.uid), userDoc);
            }
            if (email !== auth.currentUser.email) {
                await updateEmail(auth.currentUser, email);
            }
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