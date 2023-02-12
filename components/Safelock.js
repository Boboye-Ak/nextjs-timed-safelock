import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import AddSafe from "./AddSafe"
import CountdownTimer from "./CountdownTimer"
import Loader from "./Loader"
import NewSafeForm from "./NewSafeForm"
import NoSafes from "./NoSafes"
import Safe from "./Safe"
import ShareModal from "./ShareModal"
import Switch from "./Switch"
import NotificationBar from "./Notification-bar"

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
    const [showShareModal, setShowShareModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notificationText, setNotificationText] = useState("")
    const [showNotificationBar, setShowNotificationBar] = useState(false)
    const [notificationType, setNotificationType] = useState("")
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
    const showNotification = (text, notificationType = "success") => {
        setNotificationText(text)
        setNotificationType(notificationType)
        setShowNotificationBar(true)
        setTimeout(() => {
            setShowNotificationBar(false)
            setNotificationText("")
        }, 5000)
    }
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

    const toggleShowShareModal = () => {
        setShowShareModal(!showShareModal)
    }

    useEffect(() => {
        if ((isWeb3Enabled, safelockAddress)) {
            setIsLoading(true)
            updateUI()
            setIsLoading(false)
        }
    }, [safelockAddress, isWeb3Enabled, showBroken, account, chainId])
    return (
        <div>
            {isLoading && <Loader />}
            <ShareModal
                toggleShowShareModal={toggleShowShareModal}
                showShareModal={showShareModal}
                safelockAddress={safelockAddress}
                safelockId={safelockId}
            />
            <NotificationBar
                isShown={showNotificationBar}
                notificationText={notificationText}
                notificationType={notificationType}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <span className="greeting">
                    {isOwner ? <>Hello {firstName},</> : <>{firstName}&apos;s Safelock</>}
                </span>{" "}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "column",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <div
                            className="safelock-id pc-only"
                            onClick={() => {
                                setShowSafelockAddress(!showSafelockAddress)
                            }}
                        >
                            <div>Safelock #{safelockId}</div>
                        </div>
                        <div
                            className={`safelock-address-modal pc-only ${
                                !showSafelockAddress && "hidden"
                            }`}
                        >
                            <div className="close-bar">
                                <span
                                    onClick={() => {
                                        setShowSafelockAddress(!showSafelockAddress)
                                    }}
                                >
                                    x
                                </span>
                            </div>
                            <div className="main">
                                Safelock Address: {safelockAddress}{" "}
                                <div
                                    className="copy-icon"
                                    onClick={() => {
                                        navigator.clipboard.writeText(safelockAddress)
                                        showNotification(
                                            "Safelock Address copied to Clipboard",
                                            "success"
                                        )
                                    }}
                                >
                                    <Icon icon="clarity:copy-to-clipboard-line" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: safes?.length > 0 ? "1" : "0",
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

            {safes?.length <= 0 && <NoSafes isOwner={isOwner} />}
            {safes?.map((safe, index) => {
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
                        beneficiary={safe.beneficiary?.toString()?.toLowerCase()}
                        isOwner={isOwner}
                        isHidden={!showBroken && safe.isBroken}
                        safelockOwner={safelockOwner}
                        updateUI={updateUI}
                    />
                )
            })}
            {isOwner && showNewSafeForm && (
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
            <div className="share-bar">
                <div
                    className="share-icon"
                    onClick={() => {
                        toggleShowShareModal()
                    }}
                >
                    <Icon icon="bi:share" />
                </div>
            </div>
        </div>
    )
}

export default Safelock
