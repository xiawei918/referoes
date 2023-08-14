import styles from './Home.module.css';
import heroImage from '../../assets/hero.png';

export default function Home() {
    return (
        <div>
            <section className={styles['home-layout-section']}>
                <div className={styles.intro}>
                    <div>
                    <h2><strong>Be A Hero, <br/>Give A Referral.</strong></h2>
                    <p>Help connect candidates to their dream jobs.</p>
                    <button className='btn-reverse'>Give a Referral</button>
                    </div>
                    <div>
                        <img src={heroImage} style={{width: '450px', height: '360px'}} alt='hero image'/>
                    </div>
                </div>
            </section>
        </div>
    )
}