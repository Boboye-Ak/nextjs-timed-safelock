import About from "../components/About"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <About/>
        </div>
    )
}

export default AboutPage
