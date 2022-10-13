import CountdownTimer from "./CountdownTimer"

const Safe = ({ safeIndex, safeAmount, endTime }) => {
    return (
        <div
            style={{
                border: "solid",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            index: {safeIndex}
            {"  "}
            amount: {safeAmount}
            <CountdownTimer endTime={endTime} safeIndex={safeIndex}/>
        </div>
    )
}

export default Safe
