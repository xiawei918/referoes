import { useEffect, useState } from "react";
import { useSubmitApplication } from "../../hooks/useApplicationSubmit";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDocument } from '../../hooks/useDocument';
import { useParams, useNavigate } from 'react-router-dom'
import { auth, storage } from "../../firebase/config";

import styles from './ApplicationForm.module.css';

export default function ApplicationForm() {
    let { uid } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [resume, setResume] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [useOnFileResume, setUseOnFileResume] = useState(true);
    const [personalWebsiteLink, setPersonalWebsiteLink] = useState('');
    const { submitApplication, error, isPending, response } = useSubmitApplication();
    const { document: profileUser, userError } = useDocument('users', uid);
    const { document: currentUser, currentUserError } = useDocument('users', auth.currentUser.uid);
    const navigate = useNavigate();

    if (userError) {
        console.log(userError);
    }

    const [resumeError, setResumeError] = useState(null);

    const handleApplicationFormSubmit = async (e) => {
        e.preventDefault();
        const resumeFileExt = resume.name.split('.').pop();
        const resumeUploadPath = `resumes/${auth.currentUser.uid}/resume.${resumeFileExt}`
        const pdf = await uploadBytesResumable(ref(storage, resumeUploadPath), resume);
        const resumeUrl = await getDownloadURL(pdf.ref);
        let status = 'open';
        if (profileUser) {
            status = 'assigned';
        }
        let application = {
            uid: auth.currentUser.uid,
            firstName,
            lastName,
            email,
            phone,
            company: company.toUpperCase(),
            resumeUrl,
            jobTitle,
            jobLink,
            linkedinLink,
            githubLink,
            personalWebsiteLink,
            referrerName: profileUser?.displayName??null,
            referrerID: profileUser?.uid??null,
            status
        };
        if (profileUser) {
            application = {...application, referrer: profileUser};
        };
        
        await submitApplication(application);
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
        console.log(auth.currentUser)
        if (currentUser) {
            setFirstName('');
            setLastName('');
            setEmail(currentUser.email);
            setPhone('');
            setResume('');
            setJobTitle('');
            setJobLink('');
            setLinkedinLink(currentUser.linkedinLink);
            setGithubLink(currentUser.githubLink);
            setPersonalWebsiteLink(currentUser.personalWebsiteLink);
        }
    }, [currentUser])

    useEffect(() => {
        if (response?.success) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setResume('');
            setJobTitle('');
            setJobLink('');
            setLinkedinLink('');
            setGithubLink('');
            setPersonalWebsiteLink('');
            navigate('/givereferral')
        }
    }, [response.success, navigate])

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
                    <span>opening position company:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setCompany(e.target.value)}
                        value={company}
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
                        onChange={(e) => setLinkedinLink(e.target.value)}
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
                        onChange={(e) => setPersonalWebsiteLink(e.target.value)}
                        value={personalWebsiteLink}
                    />
                </label>
                {currentUser &&
                <label className={styles['on-file-resume-label']}>
                    <span className={styles['on-file-resume-span']}>Use on file </span>
                    <a href={currentUser.pdfUrl}>resume</a>
                    <input 
                        required
                        type="checkbox"
                        checked={useOnFileResume}
                        onChange={() => setUseOnFileResume(!useOnFileResume)}
                    />
                    {currentUserError && <div className="error">{currentUserError}</div>}
                </label>}
                { !useOnFileResume &&
                <label>
                    <span>resume:</span>
                    <input 
                        required
                        type="file"
                        accept="application/pdf,application/msword"
                        onChange={handleResumeChange}
                    />
                    {resumeError && <div className="error">{resumeError}</div>}
                </label>}
                { !isPending && <button className='btn'>Submit</button>}
                { isPending && <button className='btn' disabled>loading</button>}
                { error && <p>{error}</p>}
            </form>
        </div>
    )
}