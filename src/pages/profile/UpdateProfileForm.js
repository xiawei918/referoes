import styles from './UpdateProfileForm.module.css';

export default function UpdateProfileForm(props) {
    return (
        <form className={styles['profile-form']} onSubmit={props.handleProfileSubmit}>
            <label>
                <span>profile thumbnail:</span>
                <input 
                    type="file"
                    onChange={props.handleThumbnailChange}
                />
                {props.thumbnailError && <div className="error">{props.thumbnailError}</div>}
            </label>
            <label>
                <span>name:</span>
                <input 
                    required
                    type="text"
                    onChange={(e) => props.setDisplayName(e.target.value)}
                    value={props.displayName}
                />
            </label>
            <label>
                <span>email:</span>
                <input 
                    required
                    type="email"
                    onChange={(e) => props.setEmail(e.target.value)}
                    value={props.email}
                />
            </label>
            <label>
                <span>company:</span>
                <input 
                    type="text"
                    onChange={(e) => props.setCompany(e.target.value)}
                    value={props.company}
                />
            </label>
            <label>
                <span>personal bio:</span>
                <textarea 
                    onChange={(e) => props.setBio(e.target.value)}
                    value={props.bio}
                ></textarea>
            </label>
            <label>
                <span>Linkedin:</span>
                <input 
                    type="text"
                    onChange={(e) => props.setLinkedinLink(e.target.value)}
                    value={props.linkedinLink}
                />
            </label>
            <label>
                <span>Github:</span>
                <input 
                    type="text" 
                    onChange={(e) => props.setGithubLink(e.target.value)}
                    value={props.githubLink}
                />
            </label>
            <label>
                <span>Personal website:</span>
                <input 
                    type="text" 
                    onChange={(e) => props.setPersonalWebsiteLink(e.target.value)}
                    value={props.personalWebsiteLink}
                />
            </label>
            <label>
                <span>resume:</span>
                <input 
                    type="file"
                    accept="application/pdf,application/msword"
                    onChange={props.handleResumeChange}
                />
                {props.resumeError && <div className="error">{props.resumeError}</div>}
            </label>
            <div className={styles['container']}>
                { !props.isPending && <button className='btn'>Save</button>} 
                { props.isPending && <button className='btn' disabled>loading</button>}
            </div>
            { props.updateProfileError && <p className={styles.error}>{props.updateProfileError}</p>}
        </form>
    )
}