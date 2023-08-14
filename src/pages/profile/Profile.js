import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import default_avatar from '../../assets/anonymous.png';


export default function Profile() {
    const { uid } = useParams();
    const [email, setEmail] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null)
    const { updateDocument } = useFirestore('user');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const { updateUserProfile, isPending, error } = useUpdateProfile();

    const handleThumbnailChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
    
        if (!selected) {
          setThumbnailError('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setThumbnailError('Selected file must be an image')
          return
        }
        if (selected.size > 100000) {
          setThumbnailError('Image file size must be less than 100kb')
          return
        }
        
        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
      }
    
    const handleProfileEdit = (e) => {
        e.preventDefault();
        setIsEditingProfile(true);
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateUserProfile({ displayName, email, thumbnail });
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
                <div className={styles['profile-content']}>
                    {auth.currentUser.uid === uid && 
                        <>
                        {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} style={{width: '100px', height: '100px'}} alt='custom avatar'/>}
                        {!auth.currentUser.photoURL && <img src={default_avatar} style={{width: '100px', height: '100px'}} alt='default avatar'/>}
                        <ul>
                            <li>name: {displayName}</li>
                            <li>email: {email}</li>
                        </ul>
                        <button className='btn' onClick={handleProfileEdit}>Edit Profile</button>
                        </>
                    }
                </div>
            }
            {auth.currentUser.uid === uid && isEditingProfile &&
                <form className={styles['profile-form']} onSubmit={handleProfileSubmit}>
                <label>
                    <span>profile thumbnail:</span>
                    <input 
                        type="file"
                        onChange={handleThumbnailChange}
                    />
                    {thumbnailError && <div className="error">{thumbnailError}</div>}
                </label>
                <label>
                    <span>name:</span>
                    <input 
                        required
                        type="text"
                        onChange={(e) => setdisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>
                <label>
                    <span>email:</span>
                    <input 
                        required
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