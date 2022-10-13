import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"

const Safelock = ({ mySafelockId, mySafelockAddress }) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null

    const [safes, setSafes] = useState([])
    //Web3 functions
    const {
        runContractFunction: getSafes,
        isFetching: getMySafelockIdIsFetching,
        isLoading: getMySafelockIdIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: mySafelockAddress,
        functionName: "getSafes",
        params: {},
    })

    //Web2 Functions
    const updateUI = async () => {
        const safesFromCall = await getSafes()
        console.log(safesFromCall)
        setSafes(safesFromCall)
    }

    useEffect(() => {
        if ((isWeb3Enabled, mySafelockAddress)) {
            updateUI()
        }
    }, [mySafelockAddress, isWeb3Enabled])
    return (
        <div>
            My SafelockId:{mySafelockId}
            My Safelock Address:{mySafelockAddress}
            My Safes:
            {safes.map((safe) => {
                return (
                    <div>
                        amount: {safe.amount?.toString()}
                        Time Length:{safe.timeLength?.toString()}
                    </div>
                )
            })}
        </div>
    )
}

export default Safelock
