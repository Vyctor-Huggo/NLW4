import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengeContext } from "./ChallengesContext";

interface CountdownContextprops {
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderprops {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextprops);

export function CountdownProvider({children}: CountdownProviderprops) {
    const {startNewChallenge} = useContext(challengeContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setisActive(true);
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setisActive(false);
        sethasFinished(false);
        setTime(25 * 60);

    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            sethasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return (
        <CountdownContext.Provider 
        value={{
            isActive,
            hasFinished,
            minutes,
            seconds,
            startCountdown,
            resetCountdown,
            }}
            >
            {children}
        </CountdownContext.Provider>
    )
}