import { useState } from 'react';
import { useForgotPassword } from '../../hooks/useForgotPassword';

// styles
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const { resetPasswordViaEmail, error, isPending } = useForgotPassword();

    const handleResetPasswordSubmit = (e) => {
        e.preventDefault();
        resetPasswordViaEmail(email);
    }

    return (
        <form className={styles['reset-password-form']} onSubmit={handleResetPasswordSubmit}>
            <h2>Reset Password</h2>
            <label>
                <span>email:</span>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <div className={styles['container']}>
                { !isPending && <button className='btn'>Send Recovery Email</button>}
                { isPending && <button className='btn' disabled>loading</button>}
            </div>
            { error && <p>{error}</p>}
        </form>
    )
}