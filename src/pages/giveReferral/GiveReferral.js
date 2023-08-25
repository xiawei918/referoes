import styles from './GiveReferral.module.css';
import ApplicationList from '../../components/ApplicationList';
import { useCollection } from '../../hooks/useCollection';

export default function GiveReferral() {
    const { documents: applications, error } = useCollection(
        'applications', 
        [],
        ["createdAt", 'desc']
        );

    return (
        <div className={styles.container}>
            <div className={styles.content}>
            {error && <p>{error}</p>}
            {applications && <ApplicationList applications={applications}/>}
            </div>
        </div>
    )
}