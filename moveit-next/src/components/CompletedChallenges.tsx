import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengesContext';
import styles from '../Styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    const { ChallengesCompleted } = useContext(challengeContext);

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{ChallengesCompleted}</span>
        </div>
    );
}