import default_avatar from '../../assets/anonymous.png';
import { Link } from 'react-router-dom';
import styles from './ProfileContent.module.css';


export default function OtherUserProfileContent({ profileUser }) {
    return (
        <div className={styles['profile-content']}>
            {profileUser?.photoURL && <img src={profileUser?.photoURL} style={{width: '100px', height: '100px'}} alt='custom avatar'/>}
            {!profileUser?.photoURL && <img src={default_avatar} style={{width: '100px', height: '100px'}} alt='default avatar'/>}
            <ul>
                <li>name: {profileUser?.displayName}</li>
                <li>company: {profileUser?.company}</li>
                <li>bio: {profileUser?.bio}</li>
            </ul>
            {profileUser && <Link to={`/getreferral/${profileUser.id}`}><button className='btn'>Request Referral</button></Link>}
        </div>
    )
}