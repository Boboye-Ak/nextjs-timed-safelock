import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import CountdownTimer from "./CountdownTimer"
import Safe from "./Safe"
import Switch from "./Switch"

const Safelock = ({ mySafelockId, mySafelockAddress }) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null

    const [safes, setSafes] = useState([])
    const [firstName, setFirstName] = useState([])
    const [showBroken, setShowBroken] = useState(false)
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
    const {
        runContractFunction: getOwnerFirstName,
        isFetching: getOwnerFirstNameIsFetching,
        isLoading: getOwnerFirstNameIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: mySafelockAddress,
        functionName: "getOwnerFirstName",
        params: {},
    })
    let filteredSafesFromCall, safesFromCall

    //Web2 Functions
    const updateUI = async () => {
        safesFromCall = await getSafes()
        console.log(safesFromCall)
        setSafes(safesFromCall)
        const firstNameFromCall = await getOwnerFirstName()
        setFirstName(firstNameFromCall)
    }

    useEffect(() => {
        if ((isWeb3Enabled, mySafelockAddress)) {
            updateUI()
        }
    }, [mySafelockAddress, isWeb3Enabled, showBroken])
    return (
        <div>
            Hello {firstName}
            My SafelockId:{mySafelockId}
            My Safelock Address:{mySafelockAddress}
            <Switch
                isToggled={showBroken}
                onToggle={() => {
                    setShowBroken(!showBroken)
                }}
            />
            {showBroken
                ? safes.map((safe, index) => {
                      return (
                          <Safe
                              safeIndex={index}
                              safelockAddress={mySafelockAddress}
                              safeAmount={parseInt(safe.amount?.toString())}
                              endTime={
                                  parseInt(safe.createdTime?.toString()) +
                                  parseInt(safe.timeLength?.toString())
                              }
                              isBroken={safe.isBroken}
                          />
                      )
                  })
                : safes.map((safe, index) => {
                      if (!safe.isBroken) {
                          return (
                              <Safe
                                  safeIndex={index}
                                  safelockAddress={mySafelockAddress}
                                  safeAmount={parseInt(safe.amount?.toString())}
                                  endTime={
                                      parseInt(safe.createdTime?.toString()) +
                                      parseInt(safe.timeLength?.toString())
                                  }
                                  isBroken={safe.isBroken}
                              />
                          )
                      }
                  })}
        </div>
    )
}

export default Safelock
