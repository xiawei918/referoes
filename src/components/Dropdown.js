import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

import styles from './Dropdown.module.css';

const DrowdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuthContext();
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
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={handleDropdownClick} className='btn'>Menu</button>
      {isOpen && (
        <div className={styles.menu}>
          <Link to={`/profiles/${user.uid}`}>Profile</Link>
          <a href='/' onClick={logout}>Logout</a>
        </div>
      )}
    </div>
  );
};

export default DrowdownMenu;