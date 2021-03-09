import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../Styles/components/ChallengerBox.module.css'

export function ChallengerBox() {
    const { activeChallenge, completeChallege, resetChallenge } = useContext(challengeContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleCHallegeSucceded() {
        completeChallege();
        resetCountdown();

    }

    function handleCHallegeFail() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {
                activeChallenge ?
                (
                    <div className={styles.challengeActive}>
                        <header> Ganhe {activeChallenge.amount} xp </header>

                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`}/>
                            <strong> Novo desafio </strong>
                            <p>{activeChallenge.description}</p>
                        </main>

                        <footer>
                            <button 
                            type="button" 
                            className={styles.challengeFailBtn}
                            onClick={handleCHallegeFail}
                            >
                                Não Consegui
                            </button>

                            <button 
                            type="button" 
                            className={styles.challengeSucceededBtn}
                            onClick={handleCHallegeSucceded}
                            > 
                                Consegui 
                            </button>
                        </footer>
                    </div>
                )
                :
                (
                    <div className={styles.challengeNotActive}>
                        <strong> finalize um ciclo para receber desafios </strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Complete-os e ganhe experiência para avançar de level  
                        </p>
                    </div>
                )

            }
        </div>
    );
}