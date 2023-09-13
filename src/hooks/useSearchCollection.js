import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, where, orderBy, limit, getDocs, or, and, startAfter } from "firebase/firestore"


export const useSearchCollection = (collectionName, _query_pairs, _where, _orderBy, _limit=null) => {
    const [documents, setDocuments] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const [error, setError] = useState(null);
    const [loadedAll, setloadedAll] = useState(false);
    if (!_limit) {
        _limit = [];
    }
    // if we don't use useRef we will have an infinite loop;
    // because the qeury array will be reconsutrcted every
    // time the dom is mounted
    // const whereRef = useMemo(() => {return _where}, []);
    const orderByRef = useRef(_orderBy).current;
    const limitRef = useRef(_limit).current;

    const constructQuery = (q) => {
        let whereQuery = [];
        for (const key in q) {
            if (q.hasOwnProperty(key)) {
                whereQuery = [...whereQuery, where(`${key}`, '>=', `${q[key]}`)];
                whereQuery = [...whereQuery, where(`${key}`, '<=', `${q[key]}\uf8ff`)];
            }
        }
        return whereQuery;
    }

    const getInitialResults = async () => {
        let collectionRef = collection(projectFirestore, collectionName);
        let args = [];
        let q = collectionRef;

        if (Object.keys(_query_pairs).length > 0) {
            if (_where.length > 0) {
                args = [...args, or(where(..._where), and(...constructQuery(_query_pairs)))];
            }
            else {
                args = [...args, ...constructQuery(_query_pairs)];
            }
        }
        else {
            if (_where.length > 0) {
                args = [...args, where(..._where)];
            }
        }
        if (orderByRef.length > 0) {
            args = [...args, orderBy(...orderByRef)];
        }
        if (limitRef.length > 0) {
            args = [...args, limit(...limitRef)];
        }
        if (Object.keys(_query_pairs).length > 0 | _where.length > 0 | orderByRef.length > 0 | limitRef.length > 0) {
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
            setError('could not ferch the data')
        };
    }

    const loadMore = async () => {
        if (!lastDoc) return;
        let collectionRef = collection(projectFirestore, collectionName);
        let args = [];
        let q = collectionRef;

        if (Object.keys(_query_pairs).length > 0) {
            if (_where.length > 0) {
                args = [...args, or(where(..._where), and(...constructQuery(_query_pairs)))];
            }
            else {
                args = [...args, ...constructQuery(_query_pairs)];
            }
        }
        else {
            if (_where.length > 0) {
                args = [...args, where(..._where)];
            }
        }
        if (orderByRef.length > 0) {
            args = [...args, orderBy(...orderByRef)];
        }
        if (limitRef.length > 0) {
            args = [...args, limit(...limitRef)];
        }
        if (Object.keys(_query_pairs).length > 0 | _where.length > 0 | orderByRef.length > 0 | limitRef.length > 0) {
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
            setError('could not ferch the data')
        };
    }

    useEffect(() => {
        getInitialResults();
    }, [collectionName, JSON.stringify(_query_pairs), JSON.stringify(_where), orderByRef, limitRef]);

    return { documents, error, loadMore, loadedAll};
}