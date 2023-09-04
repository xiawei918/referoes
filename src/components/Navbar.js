import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from 'react';
import { useLogout } from '../hooks/useLogout';
import { FaSearch } from "react-icons/fa";
import logo from '../assets/logo.png';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
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

  const handleSearchSubmit = () => {
    navigate({
        pathname: '/search',
        search: `?user=${searchTerm}`
    });
  }

  const handleSearchSubmitWithEnter = (e) => {
    if (e.keyCode === 13) {
        handleSearchSubmit();
    }
  }

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
                        <img src={logo} className={styles['logo-image']} alt='logo' />
                    </Link>
                    <nav className={styles.navbar}>
                        <div className={styles['search-component']}>
                            <label className={styles['search-label']}>
                                <input className={styles.searchbar}
                                    type="text"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyUp={handleSearchSubmitWithEnter}
                                    value={searchTerm}
                                />
                                <div className={styles['search-icon']}>
                                    <FaSearch onClick={handleSearchSubmit}/>
                                </div>
                            </label>
                        </div>
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
                            {!user && <Link to="/login" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                            <button className='btn'>Log In</button>
                                        </Link>}
                            {!user && 
                                        <Link to="/signup" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                            <button className='btn-reverse'>Sign Up</button>
                                        </Link>}
                            <div className={`${styles.dropdown} ${!user?styles['full-screen']:''}`} ref={dropdownRef}>
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
                                    {user && <Link to={`/profiles/${user.uid}`}>Profile</Link>}
                                    {user && <a href='/' onClick={logout}>Logout</a>}
                                    </div>
                                )}
                            </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}