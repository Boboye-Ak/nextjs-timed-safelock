import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import AddSafe from "./AddSafe"
import CountdownTimer from "./CountdownTimer"
import NewSafeForm from "./NewSafeForm"
import NoSafes from "./NoSafes"
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
    const [showNewSafeForm, setShowNewSafeForm] = useState(false)
    const [showSafelockAddress, setShowSafelockAddress] = useState(true)
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
    const toggleNewSafeForm = () => {
        setShowNewSafeForm(!showNewSafeForm)
    }

    useEffect(() => {
        if ((isWeb3Enabled, mySafelockAddress)) {
            updateUI()
        }
    }, [mySafelockAddress, isWeb3Enabled, showBroken, account])
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <span className="greeting">Hello {firstName},</span>{" "}
                <div>
                    <span
                        className="safelock-id"
                        onMouseEnter={() => {
                            setShowSafelockAddress(true)
                        }}
                        onMouseLeave={() => {
                            setShowSafelockAddress(false)
                        }}
                    >
                        Safelock #{mySafelockId}
                    </span>
                    <div
                        className={`add-safe-info ${!showSafelockAddress && "hidden"}`}
                        style={{ width: "auto", position: "absolute" }}
                    >
                        Safelock Address is {mySafelockAddress}
                    </div>
                </div>
                {safes.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        OPENED SAFES
                        <Switch
                            isToggled={showBroken}
                            onToggle={() => {
                                setShowBroken(!showBroken)
                            }}
                        />
                    </div>
                )}
            </div>

            {safes?.length <= 0 && <NoSafes />}
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
            {showNewSafeForm && (
                <NewSafeForm
                    safelockAddress={mySafelockAddress}
                    updateUI={updateUI}
                    toggleNewSafeForm={toggleNewSafeForm}
                />
            )}
            {!showNewSafeForm && (
                <AddSafe
                    onClick={() => {
                        toggleNewSafeForm()
                    }}
                />
            )}
        </div>
    )
}

export default Safelock
