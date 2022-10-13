import React, { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import YouDontHaveASafelock from "../components/YouDontHaveASafelock"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import PleaseConnectWallet from "../components/PleaseConnectWallet"
import Safelock from "../components/Safelock"

const MySafelock = () => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null

    const [mySafelockId, setMySafelockId] = useState(0)
    const [mySafelockAddress, setMySafelockAddress] = useState("")
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
    const {
        runContractFunction: getMySafelockAddress,
        isFetching: getMySafelockAddressIsFetching,
        isLoading: getMySafelockAddressIsLoading,
    } = useWeb3Contract({
        abi: safelockFactoryABI,
        contractAddress: safelockFactoryAddress,
        functionName: "getMySafelockAddress",
        params: {},
    })

    //Web2 Functions
    const setAddressandId = async () => {
        let mySafelockIdFromCall = await getMySafelockId()
        mySafelockIdFromCall = mySafelockIdFromCall?.toString()
        mySafelockIdFromCall = parseInt(mySafelockIdFromCall)
        setMySafelockId(mySafelockIdFromCall)
        let mySafelockAddressFromCall = await getMySafelockAddress()
        mySafelockAddressFromCall = mySafelockAddressFromCall?.toString()
        setMySafelockAddress(mySafelockAddressFromCall)
    }

    //UseEffects
    useEffect(() => {
        if (isWeb3Enabled) {
            setAddressandId()
        }
    }, [isWeb3Enabled, account])

    return (
        <div className={styles.container}>
            <Header />
            {account ? (
                mySafelockId && mySafelockAddress ? (
                    <Safelock mySafelockId={mySafelockId} mySafelockAddress={mySafelockAddress} />
                ) : (
                    <YouDontHaveASafelock />
                )
            ) : (
                <PleaseConnectWallet />
            )}
        </div>
    )
}

export default MySafelock
