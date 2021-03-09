import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengesContext';
import styles from '../Styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(challengeContext);

    return(
        <div className={ styles.profileContainer }>
            <img src="https://github.com/Vyctor-Huggo.png" alt="Vyctor Huggo"/>
            <div>
                <strong>Vyctor Huggo</strong>
                <p>
                    <img src="icons/level.svg" alt="levelimg"/>
                    level {level}
                </p>
            </div>
        </div>
    )
}