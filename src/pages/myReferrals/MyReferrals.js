import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { auth } from '../../firebase/config';

import styles from './MyReferrals.module.css';

export default function MyReferrals() {
    const { documents: applications, error } = useCollection(
        'applications', 
        [['referrerID', '==', auth.currentUser.uid]],
        ["createdAt", 'desc']
        );

    return (
        <ul className={styles.applications}>
            {applications && applications.map((application) => (
                <li key={application.id}>
                    <p className={applications.title}><Link to={"/applications/" + application.id}>{`${application.jobTitle} @ ${application.company}`}</Link></p>
                    <p className={applications.createdat}>{application.createdAt.toDate().toLocaleDateString()}</p>
                </li>
            ))}
            {error && <p className='error'>{error}</p>}
        </ul>
    )
}