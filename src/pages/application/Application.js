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
                <li>Job Link: {application.jobLink}</li>
                {application.linkedinLink && <li>Linkedin: {application.linkedinLink}</li>}
                {application.githubLink && <li>Github: {application.githubLink}</li>}
                {application.personalWebsiteLink && <li>Personal Website: {application.personalWebsiteLink}</li>}
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