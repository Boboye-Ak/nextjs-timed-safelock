import CountdownTimer from "./CountdownTimer"
import { convertToEth } from "../utils/converter"
import { RiSafe2Line } from "react-icons/ri"

const Safe = ({ safeIndex, safeAmount, endTime, safelockAddress, isBroken }) => {
    return (
        <div
            className="safe"
            style={{
                border: "solid",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems:"center"
            }}
        >
            Safe #{safeIndex}
            {"  "}
            amount: {convertToEth(safeAmount)}
            {isBroken && <RiSafe2Line size="2em" />}
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
