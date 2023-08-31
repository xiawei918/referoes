import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from 'react';
import { useLogout } from '../hooks/useLogout';
import logo from '../assets/logo.png';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { logout } = useLogout();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
    } 
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles['header-inner']}>
                    <Link to="/" className={styles.logo}>
                        <img src={logo} style={{width: '250px', height: '50px'}} alt='logo' />
                    </Link>
                    <nav className={styles.navbar}>
                            {user && 
                                <Link to="/getreferral" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                    Get a Referral
                                </Link>
                            }
                            {user && 
                                <Link to="/givereferral" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
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
                            {user && 
                                <div className={styles.dropdown} ref={dropdownRef}>
                                    <button onClick={handleDropdownClick} className='btn-reverse'>Menu</button>
                                    {isOpen && (
                                        <div className={styles.menu}>
                                            {user && 
                                                <Link to="/getreferral" className={`${styles['nav-link']} ${styles['mobile-link']}`}>
                                                    Get a Referral
                                                </Link>
                                            }
                                            {user && 
                                                <Link to="/givereferral" className={`${styles['nav-link']} ${styles['mobile-link']}`}>
                                                    Give a Referral
                                                </Link>
                                            }
                                            {!user && 
                                                <Link to="/login" className={styles['nav-link']}>
                                                    Log In
                                                </Link>}
                                            {!user && 
                                                <Link to="/signup" className={styles['nav-link']}>
                                                    Sign Up
                                                </Link>}
                                        <Link to={`/profiles/${user.uid}`}>Profile</Link>
                                        <a href='/' onClick={logout}>Logout</a>
                                        </div>
                                    )}
                                </div>
                            }
                    </nav>
                </div>
            </div>
        </div>
    )
}