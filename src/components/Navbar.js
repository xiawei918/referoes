import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import DropdownMenu from './Dropdown';
import logo from '../assets/logo.png';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user } = useAuthContext();

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles['header-inner']}>
                    <Link to="/" className={styles.logo}>
                        <img src={logo} style={{width: '250px', height: '50px'}} alt='logo' />
                    </Link>
                    <nav className={styles.navbar}>
                            {user && 
                                <Link to="/getreferral" className={styles['nav-link']}>
                                    Get a Referral
                                </Link>
                            }
                            {user && 
                                <Link to="/givereferral" className={styles['nav-link']}>
                                    Give a Referral
                                </Link>
                            }
                            {!user && <Link to="/login" className={styles['nav-link']}>
                                            <button className='btn'>Log In</button>
                                        </Link>}
                            {!user && 
                                        <Link to="/signup" className={styles['nav-link']}>
                                            <button className='btn-reverse'>Sign Up</button>
                                        </Link>}
                            {user && <DropdownMenu/>}
                    </nav>
                </div>
            </div>
        </div>
    )
}