import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import UserList from '../../components/UserList';
import default_avatar from '../../assets/anonymous.png';

// styles
import styles from './CompanyReferrers.module.css';


export default function CompanyReferrers() {
  const { company: companyName } = useParams();
  const { documents: companyUsers, error } = useCollection(
    'users', 
    [['company', '==', companyName]],
    []
    );

    return (
    <div>
      {error && <p className="error">{error}</p>}
      {companyUsers && <UserList userList={companyUsers} error={error}/>}
    </div>
  )
}