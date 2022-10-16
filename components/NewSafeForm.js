import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Icon } from "@iconify/react"
import { safelockFactoryAddresses, safelockFactoryABI, safelockABI } from "../constants"
import { convertToWei } from "../utils/converter"

const NewSafeForm = ({ safelockAddress, updateUI, toggleNewSafeForm }) => {
    const [seconds, setSeconds] = useState("")
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    const [days, setDays] = useState("")
    const [amount, setAmount] = useState("")
    const [totalTImeInSeconds, setTotalTimeInSeconds] = useState(0)
    const [amountInWei, setAmountInWei] = useState(0)
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)

    //Web3 functions
    const {
        runContractFunction: createSafe,
        isFetching: createSafeIsFetching,
        isLoading: createSafeIsLoading,
    } = useWeb3Contract({
        abi: safelockABI,
        contractAddress: safelockAddress,
        functionName: "createSafe",
        params: { _timeLength: totalTImeInSeconds },
        msgValue: amountInWei,
    })

    //Web2 functions

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
        setDays("")
        setHours("")
        setMinutes("")
        setSeconds("")
    }

    const handleCreate = async () => {
        await createSafe({
            onSuccess: async (tx) => {
                setIsAwaitingConfirmation(true)
                await tx.wait(1)
                setIsAwaitingConfirmation(false)
                updateUI()
                resetParams()
                toggleNewSafeForm()
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
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
                <div
                    className="new-safe-form-row"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <input
                            style={{ height: "100%" }}
                            type="number"
                            placeholder="AMOUNT"
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}
                        />
                        <Icon icon="cryptocurrency:matic" fontSize="40px" />
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
                <div
                    className="new-safe-form-row"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
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
                            parseFloat(amount) == 0
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
