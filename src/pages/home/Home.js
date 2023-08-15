import styles from './Home.module.css';
import heroImage from '../../assets/hero.png';
import formImage from '../../assets/form.png';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <section className={styles['home-intro-section']}>
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
            <section className={styles['home-how-it-works-section']}>
                <div className={styles['how-it-works']}>
                    <div>
                        <h2>Easy referral<br/>at a click of a button</h2>
                        <p>Fill out a simple form.</p>
                        <p>Get a referral for your dream job.</p>
                    </div>
                    <div>
                        <img src={formImage} style={{width: '120px', height: '120px'}} alt='form image'/>
                    </div>
                </div>
            </section>
        </div>
    )
}