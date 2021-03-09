import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengesContext';
import styles from '../Styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(challengeContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0 px</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styles.currentExperience} style= {{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}