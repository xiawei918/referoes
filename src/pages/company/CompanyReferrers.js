import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import default_avatar from '../../assets/anonymous.png';

// styles
import styles from './CompanyReferrers.module.css';


export default function CompanyReferrers() {
  const { company: companyName } = useParams();
  const { documents: companyUsers, error } = useCollection(
    'users', 
    ['company', '==', companyName],
    []
    );
    console.log(companyUsers)
  return (
    <div className={styles['company-users']}>
      {error && <p className="error">{error}</p>}
        {companyUsers && 
            <ul className={styles['user-list']}>
                {companyUsers.map((user) => (
                    <li key={user.id}>
                        <img src={user.photoURL??default_avatar} alt="profile picture"/>
                        <p><Link to={"/profiles/" + user.id}>{`${user.displayName}`}</Link></p>
                    </li>
                ))}
            </ul>
        }
    </div>
  )
}