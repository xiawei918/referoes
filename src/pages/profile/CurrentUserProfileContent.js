import default_avatar from '../../assets/anonymous.png';
import styles from './ProfileContent.module.css';


export default function CurrentUserProfileContent({ profileUser, handleProfileEdit }) {
    return (
        <div className={styles['profile-content']}>
            <div className={styles.image}>
            {profileUser?.photoURL && <img src={profileUser?.photoURL} className={styles.image} style={{width: '100px', height: '100px'}} alt='custom avatar'/>}
            {!profileUser?.photoURL && <img src={default_avatar} className={styles.image} style={{width: '100px', height: '100px'}} alt='default avatar'/>}
            </div>
            <ul>
                <li>name: {profileUser?.displayName}</li>
                <li>email: {profileUser?.email}</li>
                <li>company: {profileUser?.company}</li>
                <li>bio: {profileUser?.bio}</li>
                <li>resume: <a href={profileUser?.pdfUrl}>{profileUser?.pdfUrl && 'FILE LINK'}</a></li>
            </ul>
            <div className={styles['edit-profile-button']}>
                <button className='btn' onClick={handleProfileEdit}>Edit Profile</button>
            </div>
        </div>
    )
}