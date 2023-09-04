import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, where, orderBy, limit, onSnapshot, or, and } from "firebase/firestore"


export const useSearchCollection = (collectionName, _query_pairs, _where, _orderBy, _limit=null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
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

    useEffect(() => {
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
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('could not ferch the data')
        });

        return () => unsubscribe();

    }, [collectionName, JSON.stringify(_query_pairs), JSON.stringify(_where), orderByRef, limitRef]);

    return { documents, error};
}