import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase/config';

export default function Profile() {
    const { uid } = useParams();

    return (
        <div>
            {auth.currentUser.uid === uid && 
                <ul>
                    <li>{auth.currentUser.displayName}</li>
                    <li>{auth.currentUser.email}</li>
                </ul>
            }
        </div>
    )
}