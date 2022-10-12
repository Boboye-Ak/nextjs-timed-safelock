import Image from "next/image"
import CountdownTimer from "../components/CountdownTimer"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <CountdownTimer endTime={1665670996229 / 1000} />
        </div>
    )
}
