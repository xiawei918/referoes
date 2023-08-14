import styles from './Home.module.css';

export default function Home() {
    return (
        <div>
            <section className={styles['home-layout-section']}>
                <div className={styles.intro}>
                    <h2><strong>Be A Hero, <br/>Give A Referral.</strong></h2>
                    <p>Help connect candidates to their dream jobs.</p>
                    <button className='btn-reverse'>Give a Referral</button>
                </div>
            </section>
        </div>
    )
}