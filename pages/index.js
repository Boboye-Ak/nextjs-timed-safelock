import Image from "next/image"
import { useMoralis, useWeb3Contract } from "react-moralis"
import CountdownTimer from "../components/CountdownTimer"
import GoToSafelock from "../components/GoToSafelock"
import Header from "../components/Header"
import WithdrawButton from "../components/WithdrawButton"
import styles from "../styles/Home.module.css"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import PleaseConnectWallet from "../components/PleaseConnectWallet"
import { useEffect, useState } from "react"
import YouDontHaveASafelock from "../components/YouDontHaveASafelock"
import Loader from "../components/Loader"
import SwitchToSupportedChain from "../components/SwitchToSupportedChain"

export default function Home() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null

    const [mySafelockId, setMySafelockId] = useState(0)

    //Web3 Functions
    const {
        runContractFunction: getMySafelockId,
        isFetching: getMySafelockIdIsFetching,
        isLoading: getMySafelockIdIsLoading,
    } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "getMySafelockId",
        params: {},
    })

    //Web2 Functions
    const updateUI = async () => {
        let mySafelockIdFromCall = await getMySafelockId()
        mySafelockIdFromCall = mySafelockIdFromCall?.toString()
        mySafelockIdFromCall = parseInt(mySafelockIdFromCall)
        setMySafelockId(mySafelockIdFromCall)
    }

    //UseEffects
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled, account, chainId])
    return (
        <div className={styles.container}>
            <Header />
            {!safelockFactoryAddress && account && <SwitchToSupportedChain />}
            {account ? (
                mySafelockId ? (
                    <GoToSafelock />
                ) : (
                    <YouDontHaveASafelock />
                )
            ) : (
                <PleaseConnectWallet />
            )}
        </div>
    )
}
