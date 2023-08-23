import { useEffect, useState } from "react";
import { useSubmitApplication } from "../../hooks/useApplicationSubmit";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'
import { auth, storage } from "../../firebase/config";

import styles from './ApplicationForm.module.css';

export default function ApplicationForm({ referrer }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [resume, setResume] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [linkedinLink, setlinkedinLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [personalWebsiteLink, setpersonalWebsiteLink] = useState('');
    const { submitApplication, error, isPending, response } = useSubmitApplication();
    const navigate = useNavigate();

    const [resumeError, setResumeError] = useState(null);

    const handleApplicationFormSubmit = async (e) => {
        e.preventDefault();
        const resumeFileExt = resume.name.split('.').pop();
        const resumeUploadPath = `resumes/${auth.currentUser.uid}/resume.${resumeFileExt}`
        const pdf = await uploadBytesResumable(ref(storage, resumeUploadPath), resume);
        const resumeUrl = await getDownloadURL(pdf.ref);
        let application = {
            uid: auth.currentUser.uid,
            firstName,
            lastName,
            email,
            phone,
            resumeUrl,
            jobTitle,
            jobLink,
            linkedinLink,
            githubLink,
            personalWebsiteLink
        };
        if (referrer) {
            application = {...application, referrer};
        };
        await submitApplication(application);
        console.log(response)
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

    useEffect(() => {
        if (response?.success) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setResume('');
            setJobTitle('');
            setJobLink('');
            setlinkedinLink('');
            setGithubLink('');
            setpersonalWebsiteLink('');
            navigate('/')
        }
    }, [response.success])

    return (
        <div className={styles['application-form']}>
            <h3>Request a referral</h3>
            <form onSubmit={handleApplicationFormSubmit}>
                <label>
                    <span>candidate first name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </label>
                <label>
                    <span>candidate last name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </label>
                <label>
                    <span>candidate email:</span>
                    <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>candidate phone:</span>
                    <input
                        type="tel"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                </label>
                <label>
                    <span>opening position title:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setJobTitle(e.target.value)}
                        value={jobTitle}
                    />
                </label>
                <label>
                    <span>opening position link:</span>
                    <input
                        type="text"
                        pattern="https?://.+"
                        required
                        onChange={(e) => setJobLink(e.target.value)}
                        value={jobLink}
                    />
                </label>
                <label>
                    <span>candidate Linkin URL:</span>
                    <input
                        type="url"
                        onChange={(e) => setlinkedinLink(e.target.value)}
                        value={linkedinLink}
                    />
                </label>
                <label>
                    <span>candidate Github URL:</span>
                    <input
                        type="url"
                        onChange={(e) => setGithubLink(e.target.value)}
                        value={githubLink}
                    />
                </label>
                <label>
                    <span>candidate personal website URL:</span>
                    <input
                        type="url"
                        onChange={(e) => personalWebsiteLink(e.target.value)}
                        value={personalWebsiteLink}
                    />
                </label>
                <label>
                    <span>resume:</span>
                    <input 
                        required
                        type="file"
                        accept="application/pdf,application/msword"
                        onChange={handleResumeChange}
                    />
                    {resumeError && <div className="error">{resumeError}</div>}
                </label>
                { !isPending && <button className='btn'>Submit</button>}
                { isPending && <button className='btn' disabled>loading</button>}
                { error && <p>{error}</p>}
            </form>
        </div>
    )
}