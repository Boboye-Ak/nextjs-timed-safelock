import Image from "next/image"
import CountdownTimer from "../components/CountdownTimer"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <CountdownTimer startTime={18400} />
        </div>
    )
}
