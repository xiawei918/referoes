import { useSearchParams, useLocation } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import default_avatar from '../../assets/anonymous.png';

// styles
import styles from './searchResult.module.css';


export default function SearchResult() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const userTerm = queryParams.get('user');

    const { documents: searchResultList, error } = useCollection(
        'users', 
        ['displayName', '==', userTerm],
        []
        );
    
  return (
    <div className={styles['company-users']}>
      <p>haha</p>
    </div>
  )
}