import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { ModalLevelUp } from '../components/ModalLevelUp';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface challengesContextData {
    level: number;
    currentExperience: number;
    ChallengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    LevelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallege: () => void;
    closeLevelUpModal: () => void;
}

interface Challengersproviderprops {
    children: ReactNode;
    level: number;
    currentExperience: number;
    ChallengesCompleted: number;
}

export const challengeContext = createContext({} as challengesContextData);

export function ChallengersProvider({
    children,
    ...rest
}: Challengersproviderprops) {
    const [level, setlevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [ChallengesCompleted, setChallengesCompleted] = useState(rest.ChallengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('ChallengesCompleted', String(ChallengesCompleted));
    }, [level, currentExperience, ChallengesCompleted]);

    function LevelUp() {
        setlevel(level + 1);
        setisLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setisLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
        
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio ', {
                icon: '/favicon.png',
                body: `Valendo ${challenge.amount}xp!`,
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallege() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        setChallengesCompleted(ChallengesCompleted + 1);

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(ChallengesCompleted + 1);
    }

    return (
        <challengeContext.Provider 
        value={{
            level, 
            currentExperience, 
            ChallengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            LevelUp,
            startNewChallenge,
            resetChallenge,
            completeChallege,
            closeLevelUpModal,
            }}>
            {children}
            { isLevelUpModalOpen && <ModalLevelUp /> }
        </challengeContext.Provider>
    )
}