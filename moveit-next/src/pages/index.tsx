import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import styles from '../Styles/pages/Home.module.css';
import { ExperienceBar } from '../components/ExperienceBar';
import { ChallengerBox } from '../components/ChallengerBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengersProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  ChallengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengersProvider 
    level={props.level} 
    currentExperience={props.currentExperience} 
    ChallengesCompleted={props.ChallengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengerBox />
            </div>

          </section>
        </CountdownProvider>
      </div>
    </ChallengersProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, ChallengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      ChallengesCompleted: Number(ChallengesCompleted)
    }

  }
}