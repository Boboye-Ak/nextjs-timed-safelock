import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Head from "next/head"
import "../styles/globals.css"
import "../styles/switch.css"
import "../styles/safelock.css"
import "../styles/buttons.css"
import "../styles/safe.css"
import "../styles/timer.css"
import "../styles/newsafeform.css"
import "../styles/safelock-info.css"
import "../styles/create-safelock.css"
import "../styles/header.css"
import "../styles/navbar.css"
import "../styles/share-modal.css"
import "../styles/loader.css"
import "../styles/notification.css"
import "../styles/about.css"
function MyApp({ Component, pageProps }) {
    return (
        <>
            {" "}
            <Head>
                <title>Timed Safelock</title>
                <meta name="description" content="A timed safelock on the Polygon chain" />
                <link rel="icon" href="/favicon.ico" />
            </Head>{" "}
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </>
    )
}

export default MyApp
