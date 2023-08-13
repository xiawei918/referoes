import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from './logo.png';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    <Link to="/">
                        <img src={logo} style={{width: '150px', height: '30px'}} alt='logo' />
                    </Link>
                </li>
                <li className={styles.navlink}>
                    <Link to="/getreferral">
                        Get Referral
                    </Link>
                </li>
                {!user && (
                    <>
                        <li className={styles.navlink}>
                            <Link to="/login">
                                <button className='btn'>Log In</button>
                            </Link>
                        </li>
                        <li className={styles.navlink}>
                            <Link to="/signup">
                                <button className='btn-reverse'>Sign Up</button>
                            </Link>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li className={styles.navlink}>
                            <Link to={`/profiles/${user.uid}`}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}