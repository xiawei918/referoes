import { Link } from 'react-router-dom';

import styles from './ApplicationList.module.css';

export default function ApplicationList({ applications }) {

    return (
        <ul className={styles.applications}>
            {applications.map((application) => (
                <li key={application.id}>
                    <p className={applications.title}><Link to={"/applications/" + application.id}>{`${application.jobTitle} @ ${application.company}`}</Link></p>
                    <p className={applications.createdat}>{application.createdAt.toDate().toLocaleDateString()}</p>
                </li>
            ))}
        </ul>
    )
}