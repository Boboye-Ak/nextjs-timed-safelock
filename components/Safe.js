import CountdownTimer from "./CountdownTimer"

const Safe = ({ safeIndex, amount, endTime }) => {
    return (
        <div>
            index: {safeIndex}
            amount: {amount}
            endTime:
            <CountdownTimer endTime={endTime} />
        </div>
    )
}

export default Safe
