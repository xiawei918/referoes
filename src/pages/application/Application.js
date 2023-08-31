import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

// styles
import styles from './Application.module.css';
import { auth } from '../../firebase/config';

export default function Application() {
  const { id } = useParams();
  const { document: application, error } = useDocument('applications', id);
  const { updateError, isPending, updateDocument } = useUpdateDocument('applications', id);
  console.log(application)

  const handleReferClick = async () => {
    updateDocument({
        ...application, 
        referrerName: auth.currentUser.displayName,
        referrerID: auth.currentUser.uid,
        status: 'assigned'
    })
  }

  return (
    <div className={styles.application}>
      {error && <p className="error">{error}</p>}
      {application && (
        <div>
          <h1 className={styles.title}>{`referral for ${application.jobTitle} @ ${application.company}`}</h1>
          <p>{application.createdAt.toDate().toDateString()}</p>
          <div className={styles['application-content']}>
            <ul className={styles['application-details']}>
                <li>Candidate Name: {`${application.firstName} ${application.lastName}`}</li>
                <li>Email: {application.email}</li>
                <li>Phone: {application.phone}</li>
                <li>Resume: <a href={application.resumeUrl}>FILE LINK</a></li>
                <li>Job Link: <a href={application.jobLink}>Job Link</a></li>
                {application.linkedinLink && <li>Linkedin: <a href={application.linkedinLink}>Linkedin</a></li>}
                {application.githubLink && <li>Github: <a href={application.githubLink}>Github</a></li>}
                {application.personalWebsiteLink && <li>Personal Website: <a href={application.personalWebsiteLink}>Personal Website</a></li>}
                <li>Referrer: {application.referrerName ?? 'waiting for a hero...'}</li>
                <li>Status: {application.status}</li>
            </ul>
          </div>
          {!isPending && application.status === 'open' && <button className='btn-reverse' onClick={handleReferClick}>Refer</button>}
          { isPending && <button className='btn' disabled>loading</button>}
          {updateError && <p>{updateError}</p>}
        </div>
      )}
    </div>
  )
}