import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Head from "next/head"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <>
            {" "}
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
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
