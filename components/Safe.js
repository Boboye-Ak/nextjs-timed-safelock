import CountdownTimer from "./CountdownTimer"

const Safe = ({ safeIndex, safeAmount, endTime, safelockAddress, isBroken }) => {
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
            {isBroken&&"The safe is broken"}
            <CountdownTimer
                endTime={endTime}
                safeIndex={safeIndex}
                safelockAddress={safelockAddress}
                isBroken={isBroken}
            />
        </div>
    )
}

export default Safe
