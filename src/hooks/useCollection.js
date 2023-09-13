import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, where, orderBy, limit, getDocs, or, startAfter } from "firebase/firestore"


export const useCollection = (collectionName, _query, _orderBy, _limit=null) => {
    const [documents, setDocuments] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [error, setError] = useState(null);
    const [loadedAll, setloadedAll] = useState(false);
    if (!_limit) {
        _limit = [3];
    }
    // if we don't use useRef we will have an infinite loop;
    // because the qeury array will be reconsutrcted every
    // time the dom is mounted
    const queryRef = useRef(_query).current;
    const orderByRef = useRef(_orderBy).current;
    const limitRef = useRef(_limit).current;

    const constructQuery = (q) => {
        if (q.length <= 1) {
            return where(...q[0]);
        }
        else {
            return or(...q.map((item) => where(...item)))
        }
    }

    const getInitialDocs = async () => {
        let collectionRef = collection(projectFirestore, collectionName);
        let args = [];
        let q = collectionRef;

        if (queryRef.length > 0) {
            args = [...args, constructQuery(queryRef)];
        }
        if (orderByRef.length > 0) {
            args = [...args, orderBy(...orderByRef)];
        }
        if (limitRef.length > 0) {
            args = [...args, limit(...limitRef)];
        }
        if (queryRef.length > 0 | orderByRef.length > 0 | limitRef.length > 0) {
            q = query(collectionRef, ...args);
        }

        try {
            const documentSnapshots = await getDocs(q);
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            const docs = documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                
            setLastDoc(lastVisible);
            setDocuments(docs);
            setError(null);
            if (docs.length < limitRef[0]) {
                setloadedAll(true);
            }
        }
        catch (error) {
            setError(error.message);
        }
    }

    const loadMore = async () => {
        if (!lastDoc) return;

        let collectionRef = collection(projectFirestore, collectionName);
        let args = [];
        let q = collectionRef;

        if (queryRef.length > 0) {
            args = [...args, constructQuery(queryRef)];
        }
        if (orderByRef.length > 0) {
            args = [...args, orderBy(...orderByRef)];
        }
        if (limitRef.length > 0) {
            args = [...args, limit(...limitRef)];
        }
        if (queryRef.length > 0 | orderByRef.length > 0 | limitRef.length > 0) {
            q = query(collectionRef, ...args, startAfter(lastDoc));
        }

        try {
            const documentSnapshots = await getDocs(q);
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            const moreDocs = documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                
            setLastDoc(lastVisible);
            setDocuments(prev => [...prev, ...moreDocs]);
            setError(null);
            if (moreDocs.length < limitRef[0]) {
                setloadedAll(true);
            }
        }
        catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getInitialDocs();
    }, [collectionName, queryRef, orderByRef, limitRef]);

    return { documents, error, loadMore, loadedAll };
}