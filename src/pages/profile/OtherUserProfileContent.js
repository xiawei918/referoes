import default_avatar from '../../assets/anonymous.png';
import { Link } from 'react-router-dom';
import styles from './ProfileContent.module.css';


export default function OtherUserProfileContent({ profileUser }) {
    return (
        <div className={styles['profile-content']}>
            <div className={styles.image}>
            {profileUser?.photoURL && <img src={profileUser?.photoURL} style={{width: '100px', height: '100px'}} alt='custom avatar'/>}
            {!profileUser?.photoURL && <img src={default_avatar} style={{width: '100px', height: '100px'}} alt='default avatar'/>}
            </div>
            <ul>
                <li>name: {profileUser?.displayName}</li>
                <li>company: {profileUser?.company}</li>
                <li>bio: {profileUser?.bio}</li>
                <li>Linkedin: <a href={profileUser?.linkedinLink}>{profileUser?.linkedinLink && 'LINK'}</a></li>
                <li>Github: <a href={profileUser?.githubLink}>{profileUser?.githubLink && 'LINK'}</a></li>
                <li>Personal Website: <a href={profileUser?.personalWebsiteLink}>{profileUser?.personalWebsiteLink && 'LINK'}</a></li>
            </ul>
            <div className={styles['edit-profile-button']}>
                {profileUser && <Link to={`/getreferral/${profileUser.id}`}><button className='btn'>Request Referral</button></Link>}
            </div>
        </div>
    )
}