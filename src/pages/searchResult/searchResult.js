import { useLocation } from 'react-router-dom';
import { useSearchCollection } from '../../hooks/useSearchCollection';
import UserList from '../../components/UserList';

// styles
import styles from './searchResult.module.css';


export default function SearchResult() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const userTerm = queryParams.get('user');

    const { documents: searchResultList, error } = useSearchCollection(
        'users', 
        {'displayNameUpper': userTerm?.toUpperCase()}, 
        ['company', '==', userTerm?.toUpperCase()],
        []
        );

    return (
    <div className={styles['company-users']}>
      {searchResultList && <UserList userList={searchResultList} error={error}/>}
    </div>
  )
}