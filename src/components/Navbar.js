import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from 'react';
import { useLogout } from '../hooks/useLogout';
import { FaSearch } from "react-icons/fa";
import logo from '../assets/referoeslogo.svg';
// import hamburger from '../assets/hamburger.svg';
import { Squash as Hamburger } from 'hamburger-react'

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const { logout } = useLogout();
    const [showNavbar, setShowNavbar] = useState(false)

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
        // <header className={styles.header}>
        <header className='padding-x py-8 absolute z-10 w-full'>
            <nav className='flex justify-between items-center max-container'>
                <Link to="/" >
                    <img src={logo} width={300} height={60} alt='logo' />
                </Link>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                    <li className='fonts-montserrat leading-normal text-lg whitespace-nowrap'>
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
                    </li>
                    {user && 
                        <li className='fonts-montserrat leading-normal text-lg whitespace-nowrap'>
                            <Link to="/getreferral" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                Get Referrals
                            </Link>
                        </li>
                    }
                    {user && 
                        <li className='fonts-montserrat leading-normal text-lg whitespace-nowrap'>
                            <Link to="/givereferral" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                Give Referrals
                            </Link>
                        </li>
                    }
                    {!user && 
                        <li className='fonts-montserrat leading-normal text-lg whitespace-nowrap'>
                            <Link to="/login" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                <button className='btn'>Log In</button>
                            </Link>
                        </li>}
                    {!user && 
                        <li className='fonts-montserrat leading-normal text-lg whitespace-nowrap'>
                            <Link to="/signup" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                <button className='btn-reverse'>Sign Up</button>
                            </Link>
                        </li>}
                    <li className={`${styles.dropdown} ${!user?styles['full-screen']:''}`} ref={dropdownRef}>
                        <button onClick={handleDropdownClick} className='btn-reverse'>Menu</button>
                        {isOpen && (
                            <div className={styles.menu}>
                                {user && 
                                    <Link to="/getreferral" className={`${styles['nav-link']} ${styles['mobile-link']}`}>
                                        Get Referrals
                                    </Link>
                                }
                                {user && 
                                    <Link to="/givereferral" className={`${styles['nav-link']} ${styles['mobile-link']}`}>
                                        Give Referrals
                                    </Link>
                                }
                                {user && 
                                    <Link to="/myapplications" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                        My Applications
                                    </Link>
                                }
                                {user && 
                                    <Link to="/myreferrals" className={`${styles['nav-link']} ${styles['desktop-link']}`}>
                                        My Referrals
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
                                {user && <Link to={`/profiles/${user.uid}`} className={`${styles['nav-link']}`}>Profile</Link>}
                                {user && <a href='/' onClick={logout} className={`${styles['nav-link']}`}>Logout</a>}
                            </div>
                        )}
                    </li>
                </ul>
                <div className='hidden max-lg:block'>
                    <Hamburger toggled={showNavbar} toggle={setShowNavbar} />
                    {/* <img src={hamburger} alt="Hamburger" width={25} height={25}/> */}
                </div>
            </nav>
        </header>
    )
}