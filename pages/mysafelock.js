import React, { useState } from "react"
import YouDontHaveASafelock from "../components/YouDontHaveASafelock"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import PleaseConnectWallet from "../components/PleaseConnectWallet"

const MySafelock = () => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null

    const [mySafelockId, setMySafelockId] = useState("0")
    return (
        <div className={styles.container}>
            <Header />
            {account ? <YouDontHaveASafelock /> : <PleaseConnectWallet />}
        </div>
    )
}

export default MySafelock
