import styles from './Home.module.css';
import heroImage from '../../assets/hero.png';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <section className={styles['home-layout-section']}>
                <div className={styles.intro}>
                    <div>
                        <h2><strong>Be A Hero, <br/>Give A Referral.</strong></h2>
                        <p>Help connect candidates to their dream jobs.</p>
                        <div className={styles.buttons}>
                            <button className='btn-reverse'>Give a Referral</button>
                            <div>or</div>
                            <Link to="/getreferral"><button className='btn-reverse'>Get a Referral</button></Link>
                            </div>
                            </div>
                        <div>
                        <img src={heroImage} style={{width: '420px', height: '360px'}} alt='hero image'/>
                        </div>
                </div>
            </section>
        </div>
    )
}