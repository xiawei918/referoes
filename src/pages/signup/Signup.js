import styles from './Signup.module.css';

import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const { error, isPending, signup } = useSignup();
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password, displayName);
        navigate('/landingpage');
    }

    return (
        <div>
            <form className={styles['signup-form']} onSubmit={handleSignupSubmit}>
            <h2>Signup</h2>
            <label>
                <span>email:</span>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name:</span>
                <input 
                    type="text"
                    onChange={(e) => setdisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <div className={styles['container']}>            
                { !isPending && <button className='btn'>Signup</button>} 
                { isPending && <button className='btn' disabled>loading</button>}
            </div>
            { error && <p>{error}</p>}
        </form>
        </div>
    )
}