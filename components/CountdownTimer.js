import { useEffect, useState } from "react"

const CountdownTimer = ({ endTime }) => {
    const [timerDays, setTimerDays] = useState(88)
    const [timerHours, setTimerHours] = useState(88)
    const [timerMinutes, setTimerMinutes] = useState(88)
    const [timerSeconds, setTimerSeconds] = useState(88)

    let interval

    const startTimer = () => {
        const countDownDate = endTime * 1000

        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countDownDate - now
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

    useEffect(()=>{
        startTimer()
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>{timerDays}</div>
                <small>days</small>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>{timerHours}</div>
                <small>hours</small>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>{timerMinutes}</div>
                <small>minutes</small>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>{timerSeconds}</div>
                <small>seconds</small>
            </div>
        </div>
    )
}

export default CountdownTimer
