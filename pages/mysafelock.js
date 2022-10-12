import React from "react"
import YouDontHaveASafelock from "../components/YouDontHaveASafelock"
import styles from "../styles/Home.module.css"

const MySafelock = () => {
    return (
        <div className={styles.container}>
            <YouDontHaveASafelock />
        </div>
    )
}

export default MySafelock
