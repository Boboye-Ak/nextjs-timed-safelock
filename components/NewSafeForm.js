import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Icon } from "@iconify/react"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import { convertToWei } from "../utils/converter"
import Switch from "./Switch"
import { ethers } from "ethers"
import Loader from "./Loader"
import NotificationBar from "./Notification-bar"

const NewSafeForm = ({ safelockAddress, updateUI, toggleNewSafeForm}) => {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const safelockFactoryAddress =
        chainId in safelockFactoryAddresses ? safelockFactoryAddresses[chainId][0] : null
    const [seconds, setSeconds] = useState("")
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    const [days, setDays] = useState("")
    const [amount, setAmount] = useState("")
    const [beneficiary, setBeneficiary] = useState("")
    const [totalTImeInSeconds, setTotalTimeInSeconds] = useState(0)
    const [amountInWei, setAmountInWei] = useState(0)
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)
    const [showBeneficiary, setShowBeneficiary] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notificationText, setNotificationText] = useState("")
    const [showNotificationBar, setShowNotificationBar] = useState(false)
    const [notificationType, setNotificationType] = useState("")

    //Web3 functions
    const {
        runContractFunction: createSafe,
        isFetching: createSafeIsFetching,
        isLoading: createSafeIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: safelockAddress,
        functionName: "createSafe",
        params: {
            _timeLength: totalTImeInSeconds,
            _beneficiary: showBeneficiary ? beneficiary : account,
        },
        msgValue: amountInWei,
    })

    //Web2 functions
    const showNotification = (text, notificationType = "success") => {
        setNotificationText(text)
        setNotificationType(notificationType)
        setShowNotificationBar(true)
        setTimeout(() => {
            setShowNotificationBar(false)
            setNotificationText("")
        }, 5000)
    }

    const updateParams = async () => {
        let secondsForCalculation,
            minutesForCalculation,
            hoursForCalculation,
            daysForCalculation,
            amountForCalculation
        seconds ? (secondsForCalculation = parseFloat(seconds)) : (secondsForCalculation = 0)
        minutes ? (minutesForCalculation = parseFloat(minutes) * 60) : (minutesForCalculation = 0)
        hours ? (hoursForCalculation = parseFloat(hours) * 60 * 60) : (hoursForCalculation = 0)
        days ? (daysForCalculation = parseFloat(days) * 60 * 60 * 24) : (daysForCalculation = 0)
        let totalTImeInSecondsFromCalculation =
            secondsForCalculation + minutesForCalculation + hoursForCalculation + daysForCalculation
        totalTImeInSecondsFromCalculation = totalTImeInSecondsFromCalculation?.toString()
        setTotalTimeInSeconds(totalTImeInSecondsFromCalculation)
        amountForCalculation = convertToWei(amount)
        setAmountInWei(amountForCalculation)
    }
    const resetParams = () => {
        setAmount("")
        setBeneficiary("")
        setDays("")
        setHours("")
        setMinutes("")
        setSeconds("")
    }

    const handleCreate = async () => {
        console.log("creating safe...")
        await createSafe({
            onSuccess: async (tx) => {
                setIsLoading(true)
                setIsAwaitingConfirmation(true)
                await tx.wait(1)
                setIsAwaitingConfirmation(false)
                setIsLoading(false)
                await updateUI()
                resetParams()
                toggleNewSafeForm()
                showNotification("New Safe Created Successfully")
            },
            onError: async () => {
                showNotification("Error Creating New Safe", "error")
            },
        })
    }

    useEffect(() => {
        updateParams()
    }, [seconds, minutes, hours, days, amount])
    return (
        <div
            className="new-safe-form"
            style={{
                border: "solid",
                borderWidth: "thin",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
            {isLoading && <Loader />}
            <NotificationBar
                isShown={showNotificationBar}
                notificationText={notificationText}
                notificationType={notificationType}
            />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                }}
            >
                <div className="cancel-button" onClick={toggleNewSafeForm}>
                    X
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                className="new-safe-form-main"
            >
                <div className="new-safe-form-row">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className="amount-input-div"
                    >
                        <input
                            className="amount-input"
                            type="number"
                            placeholder="AMOUNT"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}
                        />
                        <span> </span>
                        <Icon icon="cryptocurrency:matic" />
                    </div>

                    <div style={{ display: "flex" }}>
                        <input
                            className="time-input"
                            type="number"
                            placeholder="DAYS"
                            value={days}
                            onChange={(e) => {
                                setDays(e.target.value)
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className="timer-colon"
                        >
                            :
                        </div>
                        <input
                            className="time-input"
                            type="number"
                            placeholder="HOURS"
                            value={hours}
                            onChange={(e) => {
                                setHours(e.target.value)
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className="timer-colon"
                        >
                            :
                        </div>
                        <input
                            className="time-input"
                            type="number"
                            placeholder="MINUTES"
                            value={minutes}
                            onChange={(e) => {
                                setMinutes(e.target.value)
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className="timer-colon"
                        >
                            :
                        </div>
                        <input
                            className="time-input"
                            type="number"
                            placeholder="SECONDS"
                            value={seconds}
                            onChange={(e) => {
                                setSeconds(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="new-safe-form-row button">
                    {" "}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {!showBeneficiary ? (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    className="beneficiary-input-div"
                                >
                                    Toggle on if the safe is for a third party
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    className="beneficiary-input-div"
                                >
                                    <input
                                        className="amount-input"
                                        style={{ height: "100%" }}
                                        type="text"
                                        placeholder="BENEFICIARY ADDRESS"
                                        value={beneficiary}
                                        onChange={(e) => {
                                            setBeneficiary(e.target.value)
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <Switch
                            isToggled={showBeneficiary}
                            onToggle={() => {
                                setShowBeneficiary(!showBeneficiary)
                            }}
                            info=""
                        />
                    </div>
                </div>
                <div className="new-safe-form-row button">
                    <button
                        className="button-18"
                        disabled={
                            createSafeIsFetching ||
                            isAwaitingConfirmation ||
                            createSafeIsLoading ||
                            ((!seconds || parseFloat(seconds) == 0) &&
                                (!minutes || parseFloat(minutes) == 0) &&
                                (!hours || parseFloat(hours) == 0) &&
                                (!days || parseFloat(days) == 0)) ||
                            !amount ||
                            parseFloat(amount) == 0 ||
                            (showBeneficiary && !beneficiary) ||
                            (showBeneficiary && !ethers.utils.isAddress(beneficiary))
                        }
                        onClick={handleCreate}
                    >
                        CREATE SAFE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewSafeForm
