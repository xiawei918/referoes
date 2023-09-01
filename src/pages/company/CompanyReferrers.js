import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';

// styles
import styles from './CompanyReferrers.module.css';


export default function CompanyReferrers() {
  const { company: companyName } = useParams();
  const { documents: companyUsers, error } = useCollection(
    'users', 
    ['company', '==', companyName],
    ["createdAt", 'desc']
    );

  console.log(companyName)
  return (
    <div className={styles['company-users']}>
        <h1>here</h1>
      {error && <p className="error">{error}</p>}
        {companyUsers && 
            <ul className={styles['user-list']}>
                {companyUsers.map((user) => (
                    <li key={user.id}>
                        <p><Link to={"/profiles/" + user.id}>{`${user.displayName}`}</Link></p>
                    </li>
                ))}
            </ul>
        }
    </div>
  )
}