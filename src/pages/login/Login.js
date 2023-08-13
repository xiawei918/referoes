import { useState } from 'react';
// import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return (
        <form className={styles['login-form']} onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
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
            <p><Link to="/forgotpassword">Forgot Password</Link></p>
            <div className={styles['container']}>
                { !isPending && <button className='btn'>Login</button>} 
                { isPending && <button className='btn' disabled>loading</button>}
            </div>
            { error && <p>{error}</p>}
        </form>
    )
}