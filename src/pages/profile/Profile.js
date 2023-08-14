import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useDocument } from '../../hooks/useDocument';
import default_avatar from '../../assets/anonymous.png';


export default function Profile() {
    const { uid } = useParams();
    const [email, setEmail] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const [bio, setBio] = useState('');
    const [company, setCompany] = useState('');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const { updateUserProfile, isPending, error: updateProfileError } = useUpdateProfile();
    const { document: profileUser, error } = useDocument('users', uid);

    // console.log(profileUser);

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
        updateUserProfile({ displayName, email, thumbnail, bio, company });
        setIsEditingProfile(false);
    }

    useEffect(() => {
        setdisplayName(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
    }, []);

    return (
        <div className={styles.profile}>
            <h2>Your Profile</h2>
            { error && <p className={styles.error}>{error}</p>}
            {!isEditingProfile &&
                <div className={styles['profile-content']}>
                    {auth.currentUser.uid === uid && 
                        <>
                        {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} style={{width: '100px', height: '100px'}} alt='custom avatar'/>}
                        {!auth.currentUser.photoURL && <img src={default_avatar} style={{width: '100px', height: '100px'}} alt='default avatar'/>}
                        <ul>
                            <li>name: {profileUser?.displayName}</li>
                            <li>email: {profileUser?.email}</li>
                            <li>company: {profileUser?.company}</li>
                            <li>bio: {profileUser?.bio}</li>
                        </ul>
                        <button className='btn' onClick={handleProfileEdit}>Edit Profile</button>
                        </>
                    }
                    {auth.currentUser.uid !== uid && 
                        <>
                        {profileUser?.photoURL && <img src={profileUser?.photoURL} style={{width: '100px', height: '100px'}} alt='custom avatar'/>}
                        {!profileUser?.photoURL && <img src={default_avatar} style={{width: '100px', height: '100px'}} alt='default avatar'/>}
                        <ul>
                            <li>name: {profileUser?.displayName}</li>
                            <li>company: {profileUser?.company}</li>
                            <li>bio: {profileUser?.bio}</li>
                        </ul>
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
                <label>
                    <span>company:</span>
                    <input 
                        type="text"
                        onChange={(e) => setCompany(e.target.value)}
                        value={company}
                    />
                </label>
                <label>
                    <span>personal bio:</span>
                    <textarea 
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    ></textarea>
                </label>
                <div className={styles['container']}>
                { !isPending && <button className='btn'>Save</button>} 
                { isPending && <button className='btn' disabled>loading</button>}
            </div>
                { updateProfileError && <p className={styles.error}>{updateProfileError}</p>}
                </form>
            }
        </div>
    )
}