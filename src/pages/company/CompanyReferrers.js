import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import UserList from '../../components/UserList';


export default function CompanyReferrers() {
  const { company: companyName } = useParams();
  const { documents: companyUsers, error } = useCollection(
    'users', 
    [['company', '==', companyName.toUpperCase()]],
    []
    );

    return (
    <div>
      {error && <p className="error">{error}</p>}
      {companyUsers && <UserList userList={companyUsers} error={error}/>}
    </div>
  )
}