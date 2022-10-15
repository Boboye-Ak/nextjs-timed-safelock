import { useEffect, useState } from "react"
import WithdrawButton from "./WithdrawButton"

const CountdownTimer = ({ endTime, safeIndex, safelockAddress, isBroken }) => {
    const [timerDays, setTimerDays] = useState(88)
    const [timerHours, setTimerHours] = useState(88)
    const [timerMinutes, setTimerMinutes] = useState(88)
    const [timerSeconds, setTimerSeconds] = useState(88)
    const [isTimeUp, setIsTimeUp] = useState(false)

    let interval

    const startTimer = () => {
        const countDownDate = endTime * 1000

        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countDownDate - now
            if (distance <= 0) {
                setIsTimeUp(true)
            }
            const days = Math.floor(distance / (24 * 60 * 60 * 1000))
            const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000))
            const seconds = Math.floor((distance % (60 * 1000)) / 1000)
            if (distance <= 0) {
                clearInterval(interval.current)
            } else {
                setTimerSeconds(seconds)
                setTimerMinutes(minutes)
                setTimerHours(hours)
                setTimerDays(days)
            }
        })
    }

    useEffect(() => {
        startTimer()
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {!isTimeUp ? (
                <>
                    <div>Time Left:</div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className="timer-subgroup"
                    >
                        <div className="timer-digits">{timerDays}</div>
                        <small>days</small>
                    </div>
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className="timer-subgroup"
                    >
                        <div className="timer-digits">{timerHours}</div>
                        <small>hrs</small>
                    </div>
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className="timer-subgroup"
                    >
                        <div className="timer-digits">{timerMinutes}</div>
                        <small>mins</small>
                    </div>
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className="timer-subgroup"
                    >
                        <div className="timer-digits">{timerSeconds}</div>
                        <small>secs</small>
                    </div>
                </>
            ) : (
                <WithdrawButton
                    safeIndex={safeIndex}
                    safelockAddress={safelockAddress}
                    isBroken={isBroken}
                />
            )}
        </div>
    )
}

export default CountdownTimer
