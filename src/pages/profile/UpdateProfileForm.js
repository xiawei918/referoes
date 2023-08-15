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
                    onChange={(e) => props.setdisplayName(e.target.value)}
                    value={props.profileUser?.displayName}
                />
            </label>
            <label>
                <span>email:</span>
                <input 
                    required
                    type="email"
                    onChange={(e) => props.setEmail(e.target.value)}
                    value={props.profileUser?.email}
                />
            </label>
            <label>
                <span>company:</span>
                <input 
                    type="text"
                    onChange={(e) => props.setCompany(e.target.value)}
                    value={props.profileUser?.company}
                />
            </label>
            <label>
                <span>personal bio:</span>
                <textarea 
                    onChange={(e) => props.setBio(e.target.value)}
                    value={props.profileUser?.bio}
                ></textarea>
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