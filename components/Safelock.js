import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import AddSafe from "./AddSafe"
import CountdownTimer from "./CountdownTimer"
import NewSafeForm from "./NewSafeForm"
import NoSafes from "./NoSafes"
import Safe from "./Safe"
import Switch from "./Switch"

const Safelock = ({ safelockId, safelockAddress, safelockOwner }) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null

    const [safes, setSafes] = useState([])
    const [firstName, setFirstName] = useState([])
    const [showBroken, setShowBroken] = useState(false)
    const [showNewSafeForm, setShowNewSafeForm] = useState(false)
    const [showSafelockAddress, setShowSafelockAddress] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    //Web3 functions
    const {
        runContractFunction: getSafes,
        isFetching: getSafesIsFetching,
        isLoading: getSafesIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: safelockAddress,
        functionName: "getSafes",
        params: {},
    })
    const {
        runContractFunction: getOwnerFirstName,
        isFetching: getOwnerFirstNameIsFetching,
        isLoading: getOwnerFirstNameIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: safelockAddress,
        functionName: "getOwnerFirstName",
        params: {},
    })
    let filteredSafesFromCall, safesFromCall

    //Web2 Functions
    const updateUI = async () => {
        safesFromCall = await getSafes()
        setSafes(safesFromCall)
        const firstNameFromCall = await getOwnerFirstName()
        setFirstName(firstNameFromCall)
        setIsOwner(account?.toLowerCase() == safelockOwner?.toLowerCase())
    }
    const toggleNewSafeForm = () => {
        setShowNewSafeForm(!showNewSafeForm)
    }

    useEffect(() => {
        if ((isWeb3Enabled, safelockAddress)) {
            updateUI()
        }
    }, [safelockAddress, isWeb3Enabled, showBroken, account])
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
                <span className="greeting">
                    {isOwner ? <>Hello {firstName},</> : <>{firstName}'s Safelock</>}
                </span>{" "}
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
                        Safelock #{safelockId}
                    </span>
                    <div
                        className={`add-safe-info ${!showSafelockAddress && "hidden"}`}
                        style={{ width: "auto", position: "absolute", left: "35%" }}
                    >
                        Safelock Address is {safelockAddress}
                    </div>
                </div>
                {
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: safes.length > 0 ? "1" : "0",
                        }}
                    >
                        OPENED SAFES
                        <Switch
                            isToggled={showBroken}
                            onToggle={() => {
                                setShowBroken(!showBroken)
                            }}
                            info="Toggle to Show Opened Safes"
                        />
                    </div>
                }
            </div>

            {safes?.length <= 0 && <NoSafes />}
            {showBroken
                ? safes.map((safe, index) => {
                      return (
                          <Safe
                              key={index}
                              safeIndex={index}
                              safelockAddress={safelockAddress}
                              safeAmount={parseInt(safe.amount?.toString())}
                              endTime={
                                  parseInt(safe.createdTime?.toString()) +
                                  parseInt(safe.timeLength?.toString())
                              }
                              isBroken={safe.isBroken}
                              beneficiary={safe.beneficiary?.toString()}
                              isOwner={isOwner}
                              safelockOwner={safelockOwner}
                              updateUI={updateUI}
                          />
                      )
                  })
                : safes.map((safe, index) => {
                      if (!safe.isBroken) {
                          return (
                              <Safe
                                  key={index}
                                  safeIndex={index}
                                  safelockAddress={safelockAddress}
                                  safeAmount={parseInt(safe.amount?.toString())}
                                  endTime={
                                      parseInt(safe.createdTime?.toString()) +
                                      parseInt(safe.timeLength?.toString())
                                  }
                                  isBroken={safe.isBroken}
                                  beneficiary={safe.beneficiary?.toString()}
                                  isOwner={isOwner}
                                  safelockOwner={safelockOwner}
                                  updateUI={updateUI}
                              />
                          )
                      }
                  })}
            {showNewSafeForm && (
                <NewSafeForm
                    safelockAddress={safelockAddress}
                    updateUI={updateUI}
                    toggleNewSafeForm={toggleNewSafeForm}
                />
            )}
            {!showNewSafeForm && isOwner && (
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
