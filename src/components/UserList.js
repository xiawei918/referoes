import { Link } from 'react-router-dom';
import default_avatar from '../assets/anonymous.png';

// styles
import styles from './UserList.module.css';


export default function UserList({userList, error}) {

    console.log(userList)
    return (
    <div className={styles['users']}>
      {error && <p className="error">{error}</p>}
        {userList && 
            <ul className={styles['user-list']}>
                {userList.map((user) => (
                    <li key={user.id}>
                        <img src={user.photoURL??default_avatar} alt="profile"/>
                        <p><Link to={"/profiles/" + user.id}>{`${user.displayName}`}</Link></p>
                    </li>
                ))}
            </ul>
        }
    </div>
  )
}