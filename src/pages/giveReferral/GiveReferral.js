import styles from './GiveReferral.module.css';
import ApplicationList from '../../components/ApplicationList';
import { useCollection } from '../../hooks/useCollection';

export default function GiveReferral() {
    const { documents: applications, error, loadMore, loadedAll } = useCollection(
        'applications', 
        [],
        ["createdAt", 'desc']
        );

    return (
        <div className={styles.container}>
            <div className={styles.content}>
            {error && <p>{error}</p>}
            {applications && <ApplicationList applications={applications}/>}
            {applications && !loadedAll && <button className='btn' onClick={loadMore}>Load More</button>}
            </div>
        </div>
    )
}