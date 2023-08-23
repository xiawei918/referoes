import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useDocument } from '../../hooks/useDocument';
import CurrentUserProfileContent from './CurrentUserProfileContent';
import OtherUserProfileContent from './OtherUserProfileContent';
import UpdateProfileForm from './UpdateProfileForm';


export default function Profile() {
    const { uid } = useParams();
    const [email, setEmail] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const [resume, setResume] = useState(null);
    const [resumeError, setResumeError] = useState(null);
    const [bio, setBio] = useState('');
    const [company, setCompany] = useState('');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const { updateUserProfile, isPending, error: updateProfileError } = useUpdateProfile();
    const { document: profileUser, error } = useDocument('users', uid);

    // console.log(profileUser);

    const handleThumbnailChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];
    
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

    const handleResumeChange = (e) => {
        setResume(null);
        let selected = e.target.files[0];
    
        if (!selected) {
          setResumeError('Please select a file')
          return
        }
        if (selected.size > 5000000) {
            setResumeError('Image file size must be less than 5MB')
          return
        }
        
        setResumeError(null)
        setResume(selected)
        console.log('resume updated')
    }
    
    const handleProfileEdit = (e) => {
        e.preventDefault();
        setIsEditingProfile(true);
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateUserProfile({ displayName, email, thumbnail, bio, company, resume });
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
                <div>
                    {auth.currentUser.uid === uid && 
                        <CurrentUserProfileContent profileUser={profileUser} handleProfileEdit={handleProfileEdit}/>
                    }
                    {auth.currentUser.uid !== uid && 
                        <OtherUserProfileContent profileUser={profileUser}/>
                    }
                </div>
            }
            {auth.currentUser.uid === uid && isEditingProfile &&
                <UpdateProfileForm 
                    handleProfileSubmit={handleProfileSubmit}
                    handleThumbnailChange={handleThumbnailChange}
                    thumbnailError={thumbnailError}
                    setdisplayName={setdisplayName}
                    profileUser={profileUser}
                    setEmail={setEmail}
                    setCompany={setCompany}
                    setBio={setBio}
                    handleResumeChange={handleResumeChange}
                    resumeError={resumeError}
                    isPending={isPending}
                    updateProfileError={updateProfileError}
                />
            }
        </div>
    )
}