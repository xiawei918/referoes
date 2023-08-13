import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';


export default function Profile() {
    const { uid } = useParams();
    const [email, setEmail] = useState('');
    const [displayName, setdisplayName] = useState('');
    const { updateDocument } = useFirestore('user');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const { updateUserProfile, isPending, error } = useUpdateProfile();

    const handleProfileEdit = (e) => {
        e.preventDefault();
        setIsEditingProfile(true);
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateUserProfile({ displayName: displayName, email: email });
        setIsEditingProfile(false);
        // window.location.reload();
        // updateDocument(uid, 
        //     {email: email, 
        //      displayName: displayName}
        //     );
    }

    useEffect(() => {
        setdisplayName(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
    }, []);

    return (
        <div className={styles.profile}>
            <h2>Your Profile</h2>
            {!isEditingProfile &&
                <div className={styles['profile-section']}>
                    {auth.currentUser.uid === uid && 
                        <ul>
                            <li>name: {displayName}</li>
                            <li>email: {email}</li>
                        </ul>
                    }
                    <button className='btn' onClick={handleProfileEdit}>Edit Profile</button>
                </div>
            }
            {auth.currentUser.uid === uid && isEditingProfile &&
                <form className={styles['profile-form']} onSubmit={handleProfileSubmit}>
                <label>
                    <span>name:</span>
                    <input 
                        type="text"
                        onChange={(e) => setdisplayName(e.target.value)}
                        value={displayName}
                    />
                    
                </label>
                <label>
                    <span>email:</span>
                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <div className={styles['container']}>
                { !isPending && <button className='btn'>Save</button>} 
                { isPending && <button className='btn' disabled>loading</button>}
            </div>
                { error && <p className={styles.error}>{error}</p>}
                </form>
            }
        </div>
    )
}