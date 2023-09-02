import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import heroImage from '../../assets/refer_hero.png';
import formImage from '../../assets/fill_out_form.png';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';

export default function Home() {
    const { user } = useAuthContext();
    const { documents: companies, getCompaniesError } = useCollection(
        'companies', 
        [],
        ["memberCount", 'desc'],
        [5]
        );
    
    return (
        <div className={styles.container}>
            <div className={styles['section-one']}>
                <section className={styles['home-intro-section']}>
                    <div className={styles.intro}>
                        <div>
                            <h2><strong>Be A Hero, <br/>Give A Referral.</strong></h2>
                            <p>Help connect candidates to their dream jobs.</p>
                            {!user && <Link to="/signup"><button className='btn-reverse'>Get Started</button></Link>}
                            {user && <div className={styles.buttons}>
                                <Link to="/givereferral"><button className='btn-reverse'>Give a Referral</button></Link>
                                <Link to="/getreferral"><button className='btn-reverse'>Get a Referral</button></Link>
                            </div>}
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
                            <img src={formImage} className={styles['sec-two-image']} alt='filling in form'/>
                        </div>
                    </div>
                    <div className={styles['sought-after-companies']}>
                        <h3>Most Sought-After companies</h3>
                        <ul>
                            {getCompaniesError && <p>getCompaniesError</p>}
                            {companies && companies.map((company) => {
                                return <li key={company.id}><Link to={`/companyreferrers/${company.id}`}><button className='btn'>{company.id}</button></Link></li>
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}