import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

// styles
import styles from './Application.module.css';

export default function Application() {
  const { id } = useParams()
  const { document: application, error } = useDocument('applications', id)
  console.log(application)

  return (
    <div className={styles.application}>
      {error && <p className="error">{error}</p>}
      {application && (
        <>
          <h1 className={styles.title}>{`referral for ${application.jobTitle} @ ${application.company}`}</h1>
          <p>{application.createdAt.toDate().toDateString()}</p>
          <div className={styles['application-content']}>
            <ul className={styles['application-details']}>
                <li>Candidate Name: {`${application.firstName} ${application.lastName}`}</li>
                <li>Email: {application.email}</li>
                <li>Phone: {application.phone}</li>
                <li>Resume: <a href={application.resumeUrl}>FILE LINK</a></li>
                <li>Job Link: {application.jobLink}</li>
                {application.linkedinLink && <li>Linkedin: {application.linkedinLink}</li>}
                {application.githubLink && <li>Github: {application.githubLink}</li>}
                {application.personalWebsiteLink && <li>Personal Website: {application.personalWebsiteLink}</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}