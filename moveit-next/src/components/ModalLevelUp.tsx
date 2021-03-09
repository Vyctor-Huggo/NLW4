import { useContext } from 'react';

import { challengeContext } from '../contexts/ChallengesContext';
import styles from '../Styles/components/ModalLevelUp.module.css';

export function ModalLevelUp() {
    const { level, closeLevelUpModal } = useContext(challengeContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header> {level} </header>

                <strong>Parabêns</strong>
                <p>Você Alcançou um novo level</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    );
}