import styles from './Landing.module.css';

import { useState } from 'react';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const [resume, setResume] = useState(null);
    const [resumeError, setResumeError] = useState(null);
    const [bio, setBio] = useState('');
    const [company, setCompany] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [personalWebsiteLink, setPersonalWebsiteLink] = useState('');
    const navigate = useNavigate();
    const { updateUserProfile, isPending, error: updateProfileError } = useUpdateProfile();

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

    const handleLandingSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile({ bio, 
                company: company.toUpperCase(), resume, linkedinLink, 
                githubLink, personalWebsiteLink });
            console.log(isPending)
            if (!isPending) {
                navigate('/');
            }
        }
        catch (err) {
            navigate('/');
        }
    }

    return (
        <div>
            <form className={styles['landing-form']} onSubmit={handleLandingSubmit}>
            <h2>Weclome! Please tell us more</h2>
            <label>
                <span>company:</span>
                <input 
                    required
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                />
            </label>
            <label>
                <span>Linkedin:</span>
                <input 
                    type="text"
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    value={linkedinLink}
                />
            </label>
            <label>
                <span>Github:</span>
                <input 
                    type="text" 
                    onChange={(e) => setGithubLink(e.target.value)}
                    value={githubLink}
                />
            </label>
            <label>
                <span>Personal website:</span>
                <input 
                    type="text" 
                    onChange={(e) => setPersonalWebsiteLink(e.target.value)}
                    value={personalWebsiteLink}
                />
            </label>
            <label>
                <span>personal bio:</span>
                <textarea 
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                ></textarea>
            </label>
            <label>
                <span>resume:</span>
                <input 
                    type="file"
                    accept="application/pdf,application/msword"
                    onChange={handleResumeChange}
                />
                {resumeError && <div className="error">{resumeError}</div>}
            </label>
            <div className={styles['container']}>            
                { !isPending && <button className='btn'>Submit</button>} 
                { isPending && <button className='btn' disabled>loading</button>}
            </div>
            { updateProfileError && <p>{updateProfileError}</p>}
        </form>
        </div>
    )
}