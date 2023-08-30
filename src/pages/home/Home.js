import styles from './Home.module.css';
import heroImage from '../../assets/refer_hero.png';
import formImage from '../../assets/fill_out_form.png';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles['section-one']}>
                <section className={styles['home-intro-section']}>
                    <div className={styles.intro}>
                        <div>
                            <h2><strong>Be A Hero, <br/>Give A Referral.</strong></h2>
                            <p>Help connect candidates to their dream jobs.</p>
                            <div className={styles.buttons}>
                                <Link to="/givereferral"><button className='btn-reverse'>Give a Referral</button></Link>
                                <div>or</div>
                                <Link to="/getreferral"><button className='btn-reverse'>Get a Referral</button></Link>
                            </div>
                        </div>
                        <img src={heroImage} className={styles['hero-image']} alt='digital world'/>
                    </div>
                </section>
            </div>
            <div className={styles['section-two']}>
                <section className={styles['home-how-it-works-section']}>
                    <div className={styles['how-it-works']}>
                        <div>
                            <h2>Easy referral<br/>at a click of a button</h2>
                            <p>Fill out a simple form.</p>
                            <p>Get a referral for your dream job.</p>
                        </div>
                        <div>
                            <img src={formImage} style={{width: '400px', height: '220px'}} alt='filling in form'/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}