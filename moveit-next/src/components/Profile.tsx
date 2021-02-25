import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return(
        <div className={ styles.profileContainer }>
            <img src="https://github.com/Vyctor-Huggo.png" alt="Vyctor Huggo"/>
            <div>
                <strong>Vyctor Huggo</strong>
                <p>
                    <img src="icons/level.svg" alt="levelimg"/>
                    level 1
                </p>
            </div>
        </div>
    )
}