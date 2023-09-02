import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';

// styles
import styles from './CompanyApplicants.module.css';


export default function CompanyApplicants() {
  const { company: companyName } = useParams();
  const { documents: companycandidates, error } = useCollection(
    'applications', 
    ['company', '==', companyName],
    ["createdAt", 'desc']
    );

  return (
    <div className={styles['company-applicants']}>
      {error && <p className="error">{error}</p>}
        {companycandidates && 
            <ul className={styles['applicants-list']}>
                {companycandidates.map((app) => (
                    <li key={app.id}>
                        <p><Link to={"/applications/" + app.id}>{`${app.jobTitle}`}</Link></p>
                    </li>
                ))}
            </ul>
        }
    </div>
  )
}