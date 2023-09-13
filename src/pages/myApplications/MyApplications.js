import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { auth } from '../../firebase/config';

import styles from './MyApplications.module.css';

export default function MyApplications() {
    const { documents: applications, error, loadMore, loadedAll } = useCollection(
        'applications', 
        [['uid', '==', auth.currentUser.uid]],
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
            {applications && !loadedAll && 
                <div className={styles['load-more']}>
                    <button onClick={loadMore} className='btn'>Load More</button>
                </div>
            }
        </ul>
    )
}