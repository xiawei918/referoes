import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore";


export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime document data
  useEffect(() => {
    const ref = doc(projectFirestore, collection, id);

    const unsubscribe = onSnapshot(ref, snapshot => {
      // need to make sure the doc exists & has data
      if(snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id})
        setError(null)
      }
      else {
        setError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, id])

  return { document, error }
}